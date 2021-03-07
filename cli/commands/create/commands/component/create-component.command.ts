import { CommandModule } from "yargs";

import { runPlopInterface } from "../../plop/runPlopInterface";

const command: CommandModule<{}, { name?: string; relativePath?: string }> = {
	command: "component [name] [relativePath]",

	describe: "Creates the necessary files to define a new component.",

	builder: (yargs) =>
		yargs
			.positional("name", {
				type: "string",
				description: "Name of the new component.",
				demandOption: false,
			})
			.positional("relativePath", {
				type: "string",
				description:
					"Relative path to the parent folder. If not defined, " +
					"the component will be created inside `src/components` by default",
			}),

	handler: async (args) => {
		runPlopInterface({
			generator: "component",
			config: {
				name: args.name,
				relativePath: args.relativePath,
			},
		});
	},
};

export default command;
