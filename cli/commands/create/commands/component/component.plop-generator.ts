import path from "path"
import { AddActionConfig } from "plop"

import { _fs } from "../../../../_utils/fs"
import { getFormattedCode } from "../../../../_utils/getFormattedCode"
import { getMatchingFilePathsSync } from "../../../../_utils/getMatchingFilePaths"
import { projectPath } from "../../../../_utils/projectPath"
import { getImportPath } from "../../../generate-files/_utils/getImportPath"
import { GetPlopGeneratorConfig } from "../../plop/GetPlopGeneratorConfig"

export type ComponentPlopGeneratorAnswers = {
	name: string
	relativePath: string
	withStyles: boolean
	withChildren: boolean
	withStory: boolean
}

export const getComponentPlopGeneratorBypassArgsFromAnswers = (answers: Partial<ComponentPlopGeneratorAnswers>) => [
	answers.name ?? "_",
	answers.relativePath ?? "_",
	answers.withStyles?.toString() ?? "_",
	answers.withChildren?.toString() ?? "_",
	answers.withStory?.toString() ?? "_",
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
		{
			type: "confirm",
			name: "withStyles",
			message: "Is the component going to have styles?:",
		},
		{
			type: "confirm",
			name: "withChildren",
			message: "Is the component going to receive children?:",
		},
		{
			type: "confirm",
			name: "withStory",
			message: "Do you want to include a `.stories.tsx` file?:",
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
		const destination = renderString(path.resolve(projectPath, answers.relativePath))
		let templateFiles = getMatchingFilePathsSync(path.posix.resolve(handlebarsFolderPath, "**", "*"))

		const storiesFilePath = path.resolve(destination, answers.name, `${answers.name}.stories.tsx`)

		if (!answers.withStyles) {
			templateFiles = templateFiles.filter(
				(handlebarFilePath) => !handlebarFilePath.endsWith(`use{{componentName}}Styles.ts.hbs`)
			)
		}
		if (!answers.withStory) {
			templateFiles = templateFiles.filter(
				(handlebarFilePath) => !handlebarFilePath.endsWith(`{{componentName}}.stories.tsx.hbs`)
			)
		}

		return templateFiles.map<AddActionConfig>((templateFilePath) => {
			return {
				path: path
					.resolve(destination, path.relative(handlebarsFolderPath, templateFilePath))
					.replace(/\.hbs$/, ""),
				template: _fs.readFileSync(templateFilePath, "utf-8"),
				templateFile: undefined as unknown as string,
				type: "add",
				data: {
					componentName: answers.name,

					withStyles: answers.withStyles,
					withHocs: !answers.withChildren,
					withMemoHoc: !answers.withChildren,
					withChildren: answers.withChildren,

					getUuidImportPathFromStyles: getImportPath(
						storiesFilePath,
						path.resolve(projectPath, "src", "_utils", "getUuid.ts")
					),
					safeOmitImportPathFromStories: getImportPath(
						storiesFilePath,
						path.resolve(projectPath, "src", "_utils", "SafeOmit.ts")
					),
					storybookArgTypesImportPathFromStories: getImportPath(
						storiesFilePath,
						path.resolve(projectPath, "src", "components", "_utils", "StorybookArgTypes.ts")
					),
				},
				skipIfExists: true,
				transform: getFormattedCode,
			}
		})
	},
})

export default getConfig
