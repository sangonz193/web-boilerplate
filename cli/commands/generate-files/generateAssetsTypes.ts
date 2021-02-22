import chokidar from "chokidar";
import path from "path";

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { fs } from "../../_utils/fs";
import { fsExists } from "../../_utils/fsExists";
import { getFormattedCode } from "../../_utils/getFormattedCode";
import { identityMap } from "../../_utils/identityMap";
import { projectPath } from "../../_utils/projectPath";
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent";
import { getMatchingFilePaths } from "./_utils/getMatchingFilePaths";

type AssetExtension = "svg" | "png" | "jpeg" | "jpg" | "ttf";

const getAssetTypesFilePath = (filePath: string) => filePath + ".d.ts";

const generateAssetTypes = async (filePath: string) => {
	await fs.writeFile(
		getAssetTypesFilePath(filePath),
		getFormattedCode(
			generatedFileHeaderContent + `declare const filePath: string;\n` + `export default filePath;\n`
		)
	);
};

export const generateAssetsTypes = async (watch: boolean) => {
	const srcPath = path.resolve(projectPath, "src");
	const pathPatterns = dangerousKeysOf(
		identityMap<AssetExtension>({ jpeg: 0, jpg: 0, png: 0, svg: 0, ttf: 0 })
	).map((ext) => path.resolve(srcPath, "**", "*." + ext));

	const filePaths = (await Promise.all(pathPatterns.map((pathPattern) => getMatchingFilePaths(pathPattern)))).reduce<
		string[]
	>((result, pathPattern) => [...result, ...pathPattern], []);

	await Promise.all(
		filePaths.map(async (filePath) => {
			await fs.writeFile(filePath + ".d.ts", `declare const filePath: string;\n` + `export default filePath;\n`);
		})
	);

	if (watch) {
		const watcher = chokidar.watch(pathPatterns, { ignoreInitial: true });

		watcher
			.on("add", (filePath) => {
				generateAssetTypes(filePath);
			})
			.on("change", (filePath) => {
				generateAssetTypes(filePath);
			})
			.on("unlink", async (filePath) => {
				const assetTypesFilePath = getAssetTypesFilePath(filePath);

				if (await fsExists(assetTypesFilePath)) {
					fs.unlink(assetTypesFilePath);
				}
			});
	}
};
