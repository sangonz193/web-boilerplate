import { loadSchema } from "@graphql-toolkit/core";
import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { UrlLoader } from "@graphql-tools/url-loader";
import chalk from "chalk";
import { GraphQLSchema, printSchema } from "graphql";
import path from "path";
import * as yup from "yup";

import { fs } from "../../_utils/fs";
import { getFormattedCode } from "../../_utils/getFormattedCode";
import { projectPath } from "../../_utils/projectPath";
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent";

export const generateRemoteSchema = async () => {
	const remoteSchemaFilePath = path.resolve(projectPath, "src", "graphql", "remoteSchema.graphql.ts");
	const { API_CLIENT_URI } = await yup
		.object({
			API_CLIENT_URI: yup.string().required(),
		})
		.required()
		.validate(process.env);

	let writeToLocalFile = true;
	let remoteSchema: GraphQLSchema | null = await loadSchema(API_CLIENT_URI, { loaders: [new UrlLoader()] }).catch(
		() => {
			writeToLocalFile = false;
			console.log(chalk.yellow("Could not load remote schema. Using local file."));
			return null;
		}
	);

	if (remoteSchema === null) {
		remoteSchema = await loadSchema(remoteSchemaFilePath, { loaders: [new CodeFileLoader()] });
	}

	const remoteSchemaString = printSchema(remoteSchema);

	if (writeToLocalFile) {
		await fs.writeFile(
			remoteSchemaFilePath,
			getFormattedCode(
				generatedFileHeaderContent +
					'import gql from "graphql-tag";\n\n' +
					"export const remoteSchema = gql`" +
					remoteSchemaString.replace(/`/g, "\\`") +
					"`"
			)
		);
	}

	return {
		updatedFromRemote: writeToLocalFile,
		remoteSchema,
		remoteSchemaString,
	};
};
