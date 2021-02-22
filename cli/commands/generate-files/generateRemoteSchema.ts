import { loadSchema } from "@graphql-toolkit/core";
import { UrlLoader } from "@graphql-tools/url-loader";
import { printSchema } from "graphql";
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

	const remoteSchema = await loadSchema(API_CLIENT_URI, { loaders: [new UrlLoader()] });
	const remoteSchemaString = printSchema(remoteSchema);

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

	return {
		remoteSchema,
		remoteSchemaString,
	};
};
