import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "test",

	describe: "Runs tests.",

	handler: async () => {
		await spawn("npx", ["react-scripts", "test"], {
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
