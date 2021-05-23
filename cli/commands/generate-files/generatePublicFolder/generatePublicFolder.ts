import path from "path"

import { runPlopInterface } from "../../../_utils/runPlopInterface"

export const generatePublicFolder = async () => {
	runPlopInterface({
		plopFilePath: path.resolve(__dirname, "plopfile.ts"),
	})
}
