import path from "path"
import { NodePlopAPI } from "plop"

import { getMatchingFilePathsSync } from "../../../_utils/getMatchingFilePaths"

export default (plop: NodePlopAPI) => {
	plop.setWelcomeMessage("This utility is a helper to create converged React components")

	const matchingFilePaths = getMatchingFilePathsSync(
		path.resolve(__dirname, "..", "commands", "**", "*.plop-generator.ts")
	)
	matchingFilePaths.forEach((matchingFilePath) => {
		const generatorName = matchingFilePath.match(/(\w+)\.plop-generator\.ts$/)?.[1]

		if (!generatorName) {
			console.log(`Could not generator name from "${matchingFilePath}"`)
			return
		}

		plop.setGenerator(generatorName, require(matchingFilePath).default(plop))
	})
}
