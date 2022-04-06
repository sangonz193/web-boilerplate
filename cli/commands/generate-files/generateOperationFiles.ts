import { executeCodegen } from "@graphql-codegen/cli"
import * as typescriptPlugin from "@graphql-codegen/typescript"
import * as typescriptOperationsPlugin from "@graphql-codegen/typescript-operations"
import * as typescriptReactApolloPlugin from "@graphql-codegen/typescript-react-apollo"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import chokidar from "chokidar"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { getMatchingFilePaths } from "../../_utils/getMatchingFilePaths"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

export type GenerateOperationFilesOptions = {
	remoteSchema: string
	remoteSchemaTypesFilePath: string
	watch: boolean
}

const runCodegen = async (options: GenerateOperationFilesOptions, graphqlFilesPattern: string) => {
	const { remoteSchema, remoteSchemaTypesFilePath } = options

	const codegenResult = await executeCodegen({
		schema: remoteSchema,
		pluginLoader: (name) => {
			if (name.endsWith("typescript")) {
				return typescriptPlugin
			}
			if (name.endsWith("typescriptReactApollo")) {
				return typescriptReactApolloPlugin
			}
			if (name.endsWith("typescriptOperations")) {
				return typescriptOperationsPlugin
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
			[path.resolve(projectPath, "src")]: {
				preset: "near-operation-file",
				presetConfig: {
					extension: ".generated.ts",
					baseTypesPath: path.relative(path.resolve(projectPath, "src"), remoteSchemaTypesFilePath),
				},
				documents: graphqlFilesPattern,
				plugins: [
					{
						typescriptOperations: {
							preResolveTypes: true,
							avoidOptionals: true,
						},
					},
					{
						typescriptReactApollo: {
							reactApolloVersion: 3,
							noNamespaces: true,
							withHooks: true,
							withHOC: false,
							withComponent: false,
							addDocBlocks: false,
							documentMode: "external",
							importDocumentNodeExternallyFrom: "near-operation-file",
						},
					},
				],
			},
		},
	})

	await Promise.all(
		codegenResult.map(async (i) => {
			await fs.writeFile(
				i.filename,
				await getFormattedCode(
					generatedFileHeaderContent +
						(i.content.includes("* as Types") && !i.content.match(/\bTypes\./)
							? i.content.replace(/import \* as Types.+\n(\n)?/, "")
							: i.content)
				)
			)
		})
	)
}

export const generateOperationFiles = async (options: GenerateOperationFilesOptions): Promise<void> => {
	const { watch } = options
	const graphqlFilesPattern = path.resolve(projectPath, "src", "**", "*.graphql.ts")

	if (
		(await getMatchingFilePaths(graphqlFilesPattern)).filter(
			(filePath) => !path.basename(filePath).startsWith("remoteSchema.graphql")
		).length > 0
	) {
		await runCodegen(options, graphqlFilesPattern)
	}

	if (watch) {
		const watcher = chokidar.watch(graphqlFilesPattern, { ignoreInitial: true })

		watcher
			.on("add", (filePath) => runCodegen(options, filePath))
			.on("change", (filePath) => runCodegen(options, filePath))
			.on("unlink", async (filePath) => {
				const generatedFilePath = filePath.replace(/\.ts$/, ".generated.ts")

				if (await fsExists(generatedFilePath)) {
					await fs.unlink(generatedFilePath)
				}
			})
	}
}
