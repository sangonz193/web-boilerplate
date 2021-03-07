import path from "path"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "dev:storybook",

	describe: "Runs the app in development mode and runs generate-files on file changes.",

	handler: async () => {
		const storybookBinFolderPath = path.resolve(projectPath, "node_modules", "@storybook", "react", "bin")
		require(storybookBinFolderPath)

		await spawn("node", ["cli", "generate-files", "-w"])
	},
}

export default command
