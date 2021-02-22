import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

const command: CommandModule<{}, {}> = {
	command: "build",

	describe: "Bundles the app to be deployed",

	handler: async () => {
		await spawn("npx", ["react-scripts", "build"], {
			stdio: "inherit",
		});
	},
};

export default command;
