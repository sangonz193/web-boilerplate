import { identity } from "lodash";
import path from "path";
import { Plop, run } from "plop";

import {
	ComponentPlopGeneratorAnswers,
	getComponentPlopGeneratorBypassArgsFromAnswers,
} from "../commands/component/component.plop-generator";

export type PlopGeneratorConfigMap = {
	component: ComponentPlopGeneratorAnswers;
};

export type RunPlopInterfaceOptions =
	| { generator?: undefined }
	| {
			[TGenerator in keyof PlopGeneratorConfigMap]: {
				generator: TGenerator;
				config?: Partial<PlopGeneratorConfigMap[TGenerator]>;
			};
	  }[keyof PlopGeneratorConfigMap];

export const runPlopInterface = (options?: RunPlopInterfaceOptions) => {
	const getBypassArgsFromAnswersMap = identity<
		{
			[TGenerator in keyof PlopGeneratorConfigMap]: (
				answers: Partial<PlopGeneratorConfigMap[TGenerator]>
			) => string[];
		}
	>({
		component: getComponentPlopGeneratorBypassArgsFromAnswers,
	});

	const bypassAnswers = options?.generator
		? getBypassArgsFromAnswersMap[options.generator](options.config as any)
		: [];

	Plop.launch(
		{
			configPath: path.resolve(__dirname, "plopfile.ts"),
		},
		(env) => run(env, undefined, false, options?.generator ?? "", bypassAnswers)
	);
};
