import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Runs the app in development mode.",

	handler: async () => {
		await spawn("node", ["cli", "generate-files"])

		await spawn("npx", ["react-scripts", "start"], {
			stdio: "inherit",
			cwd: projectPath,
			env: {
				...process.env,
				SKIP_PREFLIGHT_CHECK: "true",
			},
		})
	},
}

export default command
