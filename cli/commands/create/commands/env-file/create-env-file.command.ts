import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import chalk from "chalk"
import dotenv from "dotenv"
import path from "path"
import { CommandModule } from "yargs"

import { projectPath } from "../../../../_utils/projectPath"

const command: CommandModule<{}, { useProcess: boolean }> = {
	command: "env-file",

	describe: "Creates the .env file.",

	builder: (yargs) =>
		yargs.option("useProcess", {
			type: "boolean",
			alias: "p",
			description: "Whether to get env values from `process.env`.",
			demandOption: false,
			default: false,
		}),

	handler: async (args) => {
		const envFilePath = path.resolve(projectPath, ".env")
		const appEnvFilePath = path.resolve(projectPath, ".env.app")
		const cliEnvFilePath = path.resolve(projectPath, ".env.cli")

		if (await fsExists(envFilePath)) {
			console.log(chalk.red(`File already exists: ${envFilePath}`))
			return
		}

		const [appEnvFileContent, cliEnvFileContent] = await Promise.all([
			fs.readFile(appEnvFilePath, "utf8"),
			fs.readFile(cliEnvFilePath, "utf8"),
		])
		const fullEnvFileContent = appEnvFileContent + "\n" + cliEnvFileContent

		if (args.useProcess) {
			const parsedEnv = dotenv.parse(fullEnvFileContent)
			let fileContent = ""
			Object.keys(parsedEnv).forEach((key) => {
				fileContent += `${key}=${process.env[key] ?? parsedEnv[key]}\n`
			})

			await fs.writeFile(envFilePath, fileContent)
		} else {
			await fs.writeFile(envFilePath, fullEnvFileContent)
		}

		console.log(chalk.green(`.env file successfully created.`))
	},
}

export default command
