import path from "path"
import yargs, { CommandModule } from "yargs"

import { getSubCommands } from "./_utils/getSubCommands"

const run = async () => {
	const commandsDirPath = path.resolve(__dirname, "commands")
	const commands: Array<CommandModule<unknown, unknown>> =
		process.argv[2] === "generate-files"
			? [require(path.resolve(commandsDirPath, "generate-files", "generate-files.command.ts")).default]
			: await getSubCommands(commandsDirPath)

	const _yargs = yargs.scriptName("node cli")

	commands.forEach((command) => _yargs.command(command))

	_yargs.locale("en_US").parserConfiguration({ "camel-case-expansion": false }).showHelpOnFail(false).strict().argv
}

run()
