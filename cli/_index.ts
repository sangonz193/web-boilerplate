import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import chalk from "chalk"
import dotenv from "dotenv"
import path from "path"
import semver from "semver"

import { projectPath } from "./_utils/projectPath"

const run = async () => {
	const expectedNodeVersion = await fs.readFile(path.resolve(projectPath, ".nvmrc"), "utf-8")

	if (!semver.satisfies(process.version, expectedNodeVersion)) {
		throw new Error(
			`The current node version does not satisfy the expected node version: "${expectedNodeVersion}". Current node version: ${process.version}`
		)
	}

	const envFilePath = path.resolve(projectPath, ".env")

	if (await fsExists(envFilePath)) {
		const envFileValues = dotenv.parse(await fs.readFile(envFilePath, "utf8"))
		Object.keys(envFileValues).forEach((envFileKey) => {
			process.env[envFileKey] = process.env[envFileKey] ?? envFileValues[envFileKey]
		})
	} else {
		console.log(chalk.yellow(`Env file not found: .env\nSkipping env config.`))
	}

	require("./cli")
}

run()
