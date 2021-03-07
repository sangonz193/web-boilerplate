import { CLIEngine } from "eslint"
import path from "path"

import { projectPath } from "./projectPath"

export const getFormattedCode = (code: string): string => {
	return (
		new CLIEngine({ fix: true }).executeOnText(code, path.resolve(projectPath, "src", "index.tsx")).results[0]
			.output ?? code
	)
}
