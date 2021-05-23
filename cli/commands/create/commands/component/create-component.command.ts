import { CommandModule } from "yargs"

import { runPlopInterface } from "../../../../_utils/runPlopInterface"
import { createPlopFilePath } from "../../plop/plopfile.path"
import {
	ComponentPlopGeneratorAnswers,
	getComponentPlopGeneratorBypassArgsFromAnswers,
} from "./component.plop-generator"

const command: CommandModule<
	{},
	{
		name?: string
		relativePath?: string
		interactive?: boolean
	}
> = {
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
			})
			.option("interactive", {
				type: "boolean",
				alias: "i",
				default: false,
			}),

	handler: async (args) => {
		let config: Partial<ComponentPlopGeneratorAnswers> = {
			name: args.name,
			relativePath: args.relativePath,
		}

		if (!args.interactive) {
			config = {
				...config,
				relativePath: args.relativePath ?? "src/components",
				withChildren: config.withChildren ?? false,
				withStyles: config.withStyles ?? true,
				withStory: config.withStory ?? true,
			}
		}

		runPlopInterface({
			generator: "component",
			bypassAnswers: getComponentPlopGeneratorBypassArgsFromAnswers(config),
			plopFilePath: createPlopFilePath,
		})
	},
}

export default command
