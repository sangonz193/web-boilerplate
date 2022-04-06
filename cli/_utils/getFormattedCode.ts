import { ESLint } from "eslint"
import path from "path"

import { projectPath } from "./projectPath"

export const getFormattedCode = async (code: string): Promise<string> => {
	if (
		((
			await new ESLint({ fix: true }).lintText(code, { filePath: path.resolve(projectPath, "src", "index.tsx") })
		)[0].output ?? code) === undefined
	) {
		debugger
	}
	return (
		(await new ESLint({ fix: true }).lintText(code, { filePath: path.resolve(projectPath, "src", "index.tsx") }))[0]
			.output ?? code
	)
}
