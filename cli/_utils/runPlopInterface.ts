import { hasProperty } from "@sangonz193/utils/hasProperty"
import { Plop, run } from "plop"

export type RunPlopInterfaceOptions = {
	plopFilePath: string
	generator?: string
	bypassAnswers?: string[]
}

export const runPlopInterface = (options: RunPlopInterfaceOptions) => {
	Plop.launch(
		{
			configPath: options.plopFilePath,
		},
		(env) =>
			run(
				env,
				undefined,
				false,
				options?.generator,
				options && hasProperty(options, "bypassAnswers") ? options?.bypassAnswers : undefined
			)
	)
}
