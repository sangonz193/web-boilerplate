import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Runs the app in development mode and runs generate-files on file changes.",

	handler: async () => {
		await Promise.all([
			spawn("npx", ["react-scripts", "start"], {
				stdio: "inherit",
			}),
			spawn("node", ["cli", "generate-files", "-w"]),
		]);
	},
};

export default command;
