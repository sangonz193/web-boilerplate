import path from "path";
import { CommandModule } from "yargs";

import { getSubCommandsSync } from "../../_utils/getSubCommands";
import { runPlopInterface } from "./plop/runPlopInterface";

const command: CommandModule<{}, {}> = {
	command: "create",

	describe: "Commands to create different types of common code files, like components.",

	builder: (yargs) => {
		const commandsFolderPath = path.resolve(__dirname, "commands");
		getSubCommandsSync(commandsFolderPath).forEach((command) => yargs.command(command));

		return yargs;
	},

	handler: () => {
		runPlopInterface();
	},
};

export default command;
