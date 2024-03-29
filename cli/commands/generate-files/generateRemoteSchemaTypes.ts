import { executeCodegen } from "@graphql-codegen/cli"
import * as typescriptPlugin from "@graphql-codegen/typescript"
import { fs } from "@sangonz193/utils/node/fs"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

export const generateRemoteSchemaTypes = async (remoteSchema: string): Promise<string> => {
	const remoteSchemaTypesFilePath = path.resolve(projectPath, "src", "graphql", "remoteSchema.types.ts")
	const codegenResult = (
		await executeCodegen({
			schema: remoteSchema,
			pluginLoader: (name) => {
				if (name.endsWith("typescript")) {
					return typescriptPlugin
				}

				throw new Error(name + " not found")
			},
			generates: {
				[remoteSchemaTypesFilePath]: {
					plugins: [
						{
							typescript: {
								enumsAsTypes: true,
								nonOptionalTypename: true,
							},
						},
					],
				},
			},
		})
	)[0]

	await fs.writeFile(
		remoteSchemaTypesFilePath,
		await getFormattedCode(generatedFileHeaderContent + codegenResult.content)
	)

	return remoteSchemaTypesFilePath
}
