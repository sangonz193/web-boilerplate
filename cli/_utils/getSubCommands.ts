import path from "path"
import { CommandModule } from "yargs"

import { getMatchingFilePaths, getMatchingFilePathsSync } from "./getMatchingFilePaths"

export const getSubCommands = async (directoryPath: string): Promise<Array<CommandModule<unknown, unknown>>> => {
	const matchingFiles = await Promise.all([
		getMatchingFilePaths(path.resolve(directoryPath, "*.command.ts")),
		getMatchingFilePaths(path.resolve(directoryPath, "*/*.command.ts")),
	]).then((results) => results.reduce((result, matchingPaths) => [...result, ...matchingPaths]))

	return matchingFiles.map((filePath) => {
		return require(filePath).default
	})
}

export const getSubCommandsSync = (directoryPath: string): Array<CommandModule<unknown, unknown>> => {
	const matchingFiles = [
		getMatchingFilePathsSync(path.resolve(directoryPath, "*.command.ts")),
		getMatchingFilePathsSync(path.resolve(directoryPath, "*/*.command.ts")),
	].reduce((result, matchingPaths) => [...result, ...matchingPaths])

	return matchingFiles.map((filePath) => {
		return require(filePath).default
	})
}
