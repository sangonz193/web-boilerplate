import { _fs } from "@sangonz193/utils/node/fs"
import path from "path"
import { AddActionConfig, NodePlopAPI } from "plop"

import { getFormattedCode } from "../../../_utils/getFormattedCode"
import { getMatchingFilePathsSync } from "../../../_utils/getMatchingFilePaths"
import { projectPath } from "../../../_utils/projectPath"

export default function (plop: NodePlopAPI) {
	plop.setGenerator("public folder", {
		description: "",
		prompts: [],
		actions: () => {
			const handlebarsFolderPath = path.resolve(__dirname, "handlebars")
			const destination = path.resolve(projectPath, "public")
			const templateFiles = getMatchingFilePathsSync(path.posix.resolve(handlebarsFolderPath, "**", "*"))

			return templateFiles.map<AddActionConfig>((templateFilePath) => {
				return {
					path: path
						.resolve(destination, path.relative(handlebarsFolderPath, templateFilePath))
						.replace(/\.hbs$/, ""),
					template: _fs.readFileSync(templateFilePath, "utf-8"),
					templateFile: undefined as unknown as string,
					type: "add",
					data: {
						PUBLIC_URL: process.env.PUBLIC_URL.replace(/\/$/, "").trim(),
						APP_NAME: process.env.APP_NAME?.trim(),
						APP_SHORT_NAME: process.env.APP_SHORT_NAME?.trim(),
					},
					skipIfExists: false,
					force: true,
					transform: getFormattedCode,
				}
			})
		},
	})
}
