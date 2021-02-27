import { CommandModule } from "yargs";

import { generateAssetsTypes } from "./generateAssetsTypes";
import { generateComponentIndexes } from "./generateComponentIndexes";
import { generateOperationFiles } from "./generateOperationFiles";
import { generatePossibleTypes } from "./generatePossibleTypes";
import { generateRemoteSchema } from "./generateRemoteSchema";
import { generateRemoteSchemaTypes } from "./generateRemoteSchemaTypes";

const command: CommandModule<{}, { watch: boolean }> = {
	command: "generate-files",

	describe: "Generates helper files, such as `.d.ts` files for every asset and graphql/typescript related files.",

	builder: (yargs) =>
		yargs.option("watch", {
			alias: "w",
			type: "boolean",
			demandOption: false,
			default: false,
		}),

	handler: async (args) => {
		const { watch } = args;

		const remoteSchemaPromise = generateRemoteSchema();
		const remoteSchemaTypesPromise = remoteSchemaPromise.then(({ remoteSchemaString }) =>
			generateRemoteSchemaTypes(remoteSchemaString)
		);

		await Promise.all([
			generateAssetsTypes(watch),
			remoteSchemaPromise.then(async ({ remoteSchemaString }) => {
				const remoteSchemaTypesFilePath = await remoteSchemaTypesPromise;
				await generateOperationFiles({
					remoteSchema: remoteSchemaString,
					remoteSchemaTypesFilePath,
					watch,
				});
			}),
			remoteSchemaPromise.then(({ updatedFromRemote }) => {
				if (!updatedFromRemote) {
					return;
				}

				return generatePossibleTypes();
			}),
			generateComponentIndexes(watch),
		]);
	},
};

export default command;
