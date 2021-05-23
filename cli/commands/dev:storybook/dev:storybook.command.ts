import path from "path"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "dev:storybook",

	describe: "Runs the storybook interface.",

	handler: async () => {
		await spawn("node", ["cli", "generate-files"])

		const storybookBinFolderPath = path.resolve(projectPath, "node_modules", "@storybook", "react", "bin")
		require(storybookBinFolderPath)
	},
}

export default command
