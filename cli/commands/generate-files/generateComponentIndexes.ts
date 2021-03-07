import chokidar from "chokidar";
import path from "path";

import { fs } from "../../_utils/fs";
import { fsExists } from "../../_utils/fsExists";
import { getFormattedCode } from "../../_utils/getFormattedCode";
import { getMatchingFilePaths } from "../../_utils/getMatchingFilePaths";
import { projectPath } from "../../_utils/projectPath";
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent";
import { getImportPath } from "./_utils/getImportPath";

const handlePossibleComponentFolder = async (possibleComponentFolderPath: string) => {
	const possibleComponentName = path.basename(possibleComponentFolderPath);

	const indexFilePath = path.join(possibleComponentFolderPath, "index.ts");
	const filePathsToExportFrom: string[] = [];

	await Promise.all(
		[
			`${possibleComponentName}.tsx`,
			`${possibleComponentName}.types.ts`,
			`render${possibleComponentName}.tsx`,
			`use${possibleComponentName}.tsx`,
			`use${possibleComponentName}Styles.ts`,
		].map(async (componentFileName) => {
			const componentFilePath = path.join(possibleComponentFolderPath, componentFileName);

			if (await fsExists(componentFilePath)) {
				filePathsToExportFrom.push(componentFilePath);
			}
		})
	);

	if (filePathsToExportFrom.length > 3) {
		await fs.writeFile(
			indexFilePath,
			getFormattedCode(
				generatedFileHeaderContent +
					filePathsToExportFrom
						.sort()
						.map((filePathToExportFrom) => {
							return `export * from "${getImportPath(indexFilePath, filePathToExportFrom)}"`;
						})
						.join("\n")
			)
		);
	}
};

const foldersToReadTimeoutsMap = new Map<string, NodeJS.Timeout>();
const handlePossibleComponentFilePath = async (possibleComponentFilePath: string) => {
	const possibleComponentFolderPath = path.resolve(possibleComponentFilePath, "..");
	if (foldersToReadTimeoutsMap.has(possibleComponentFolderPath)) {
		return;
	}

	foldersToReadTimeoutsMap.set(
		possibleComponentFolderPath,
		setTimeout(async () => {
			foldersToReadTimeoutsMap.delete(possibleComponentFolderPath);
			await handlePossibleComponentFolder(possibleComponentFolderPath);
		}, 100)
	);
};

export const generateComponentIndexes = async (watch: boolean) => {
	const srcPath = path.resolve(projectPath, "src");
	const possibleComponentFilesPattern = path.join(srcPath, "**", "*.tsx");
	const possibleComponentFilePaths = await getMatchingFilePaths(possibleComponentFilesPattern);

	await Promise.all(
		[
			...new Set(
				possibleComponentFilePaths.map((possibleComponentFilePath) =>
					path.resolve(possibleComponentFilePath, "..")
				)
			),
		].map(handlePossibleComponentFolder)
	);

	if (watch) {
		chokidar
			.watch(possibleComponentFilesPattern, { ignoreInitial: true })
			.on("add", (filePath) => handlePossibleComponentFilePath(filePath))
			.on("change", (filePath) => handlePossibleComponentFilePath(filePath));
	}
};
