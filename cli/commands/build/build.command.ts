import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "build",

	describe: "Bundles the app to be deployed",

	handler: async () => {
		await spawn("npx", ["react-scripts", "build"], {
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
