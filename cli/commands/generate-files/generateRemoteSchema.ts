import { loadSchema } from "@graphql-toolkit/core"
import { CodeFileLoader } from "@graphql-tools/code-file-loader"
import { UrlLoader } from "@graphql-tools/url-loader"
import chalk from "chalk"
import { GraphQLSchema, printSchema } from "graphql"
import path from "path"
import * as yup from "yup"

import { fs } from "../../_utils/fs"
import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

export const generateRemoteSchema = async () => {
	const remoteSchemaFilePath = path.resolve(projectPath, "src", "graphql", "remoteSchema.graphql.ts")
	const { BACKEND_URL } = await yup
		.object({
			BACKEND_URL: yup.string().notRequired(),
		})
		.required()
		.validate(process.env)

	let writeToLocalFile = false
	let remoteSchema: GraphQLSchema | null = null

	if (BACKEND_URL) {
		remoteSchema = await loadSchema(`${BACKEND_URL}/graphql`, {
			loaders: [new UrlLoader()],
		}).catch(() => {
			console.log(chalk.yellow("Could not load remote schema. Using local file."))
			return null
		})

		if (remoteSchema) {
			writeToLocalFile = true
		}
	}

	if (remoteSchema === null) {
		remoteSchema = await loadSchema(remoteSchemaFilePath, { loaders: [new CodeFileLoader()] })
	}

	const remoteSchemaString = printSchema(remoteSchema)

	if (writeToLocalFile) {
		await fs.writeFile(
			remoteSchemaFilePath,
			getFormattedCode(
				generatedFileHeaderContent +
					'import gql from "graphql-tag";\n\n' +
					"export const remoteSchema = gql`" +
					remoteSchemaString.replace(/`/g, "\\`") +
					"`"
			)
		)
	}

	return {
		updatedFromRemote: writeToLocalFile,
		remoteSchema,
		remoteSchemaString,
	}
}
