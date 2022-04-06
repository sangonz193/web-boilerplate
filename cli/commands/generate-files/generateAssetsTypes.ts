import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { identityMap } from "@sangonz193/utils/identityMap"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import chokidar from "chokidar"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { getMatchingFilePaths } from "../../_utils/getMatchingFilePaths"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

type AssetExtension = "svg" | "png" | "jpeg" | "jpg" | "ttf"

const getAssetTypesFilePath = (filePath: string) => filePath + ".d.ts"

const generateAssetTypes = async (filePath: string) => {
	await fs.writeFile(
		getAssetTypesFilePath(filePath),
		await getFormattedCode(
			generatedFileHeaderContent + `declare const filePath: string;\n` + `export default filePath;\n`
		)
	)
}

export const generateAssetsTypes = async (watch: boolean) => {
	const srcPath = path.resolve(projectPath, "src")
	const pathPatterns = dangerousKeysOf(identityMap<AssetExtension>({ jpeg: 0, jpg: 0, png: 0, svg: 0, ttf: 0 })).map(
		(ext) => path.resolve(srcPath, "**", "*." + ext)
	)

	const filePaths = (await Promise.all(pathPatterns.map((pathPattern) => getMatchingFilePaths(pathPattern)))).reduce<
		string[]
	>((result, pathPattern) => [...result, ...pathPattern], [])

	await Promise.all(
		filePaths.map(async (filePath) => {
			await generateAssetTypes(filePath)
		})
	)

	if (watch) {
		const watcher = chokidar.watch(pathPatterns, { ignoreInitial: true })

		watcher
			.on("add", (filePath) => {
				generateAssetTypes(filePath)
			})
			.on("change", (filePath) => {
				generateAssetTypes(filePath)
			})
			.on("unlink", async (filePath) => {
				const assetTypesFilePath = getAssetTypesFilePath(filePath)

				if (await fsExists(assetTypesFilePath)) {
					fs.unlink(assetTypesFilePath)
				}
			})
	}
}
