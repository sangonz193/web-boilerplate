import identity from "lodash/identity"
import path from "path"
import { AddManyActionConfig } from "plop"

import { getFormattedCode } from "../../../../_utils/getFormattedCode"
import { projectPath } from "../../../../_utils/projectPath"
import { getImportPath } from "../../../generate-files/_utils/getImportPath"
import { GetPlopGeneratorConfig } from "../../plop/GetPlopGeneratorConfig"

export type ComponentPlopGeneratorAnswers = {
	name: string
	relativePath: string
}

export const getComponentPlopGeneratorBypassArgsFromAnswers = (answers: Partial<ComponentPlopGeneratorAnswers>) => [
	answers.name ?? "_",
	answers.relativePath ?? "_",
]

const getConfig: GetPlopGeneratorConfig = (plop) => ({
	description: "Create a new component.",

	prompts: [
		{
			type: "input",
			name: "name",
			message: "New component name:",
			validate: (input: string) =>
				/^[A-Z][a-zA-Z0-9]+$/.test(input) || "Must enter a PascalCase component name (ex: MyComponent)",
		},
		{
			type: "input",
			name: "relativePath",
			message: "Relative path where to place the component:",
			default: "src/components",
			validate: (input: string) => {
				const srcPath = path.resolve(projectPath, "src")
				const absoluteInputPath = path.resolve(projectPath, input)

				const relative = path.relative(srcPath, absoluteInputPath)

				return (
					(relative && !relative.startsWith("..") && !path.isAbsolute(relative)) ||
					"The folder must be inside the src folder."
				)
			},
		},
	],

	actions: (_answers) => {
		if (!_answers) {
			return []
		}
		const answers = _answers as ComponentPlopGeneratorAnswers
		const renderString = (text: string): string => {
			return plop.renderString(text, answers)
		}

		const handlebarsFolderPath = path.resolve(__dirname, "handlebars")
		const handlebarsFilePathPattern = path.resolve(handlebarsFolderPath, "**", "*")
		const destination = renderString(path.resolve(projectPath, answers.relativePath))

		return [
			identity<AddManyActionConfig>({
				type: "addMany",
				data: {
					componentName: answers.name,
					dangerousKeysOfImportPath: getImportPath(
						path.resolve(destination, "_", "_"),
						path.resolve(projectPath, "src", "_utils", "dangerousKeysOf.ts")
					),
					propsToStateImportPath: getImportPath(
						path.resolve(destination, "_", "_"),
						path.resolve(projectPath, "src", "_utils", "PropsToState.ts")
					),
					getSlotsWithPropsImportPath: getImportPath(
						path.resolve(destination, "_", "_"),
						path.resolve(projectPath, "src", "_utils", "getSlotsWithProps.tsx")
					),
				},
				destination,
				templateFiles: [handlebarsFilePathPattern],
				globOptions: {
					dot: true,
				},
				verbose: true,
				skipIfExists: false,
				base: handlebarsFolderPath,
				path: "",
				transform: getFormattedCode,
			}),
		]
	},
})

export default getConfig
