import axios from "axios";
import path from "path";
import * as yup from "yup";

import { hasProperty } from "../../../src/_utils/hasProperty";
import { isObject } from "../../../src/_utils/isObject";
import { fs } from "../../_utils/fs";
import { getFormattedCode } from "../../_utils/getFormattedCode";
import { projectPath } from "../../_utils/projectPath";
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent";

export const generatePossibleTypes = async () => {
	const { BACKEND_URL } = await yup
		.object({
			BACKEND_URL: yup.string().required(),
		})
		.required()
		.validate(process.env);

	const fragmentsResponse = await axios(`${BACKEND_URL}/graphql`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: {
			variables: {},
			query: `{__schema {types {kind,name,possibleTypes {name}}}}`,
		},
	});

	const fragmentsData = await fragmentsResponse.data;

	const isSuccessData = (
		value: unknown
	): value is {
		__schema: {
			types: Array<{
				kind: string;
				name: string;
				possibleTypes: Array<{
					name: string;
				}>;
			}>;
		};
	} => isObject(value) && hasProperty(value, "__schema");

	const responseData = fragmentsData?.data;
	if (isSuccessData(responseData)) {
		const possibleTypesMap: Record<string, string[]> = {};

		responseData.__schema.types.forEach((supertype) => {
			if (supertype.possibleTypes) {
				possibleTypesMap[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
			}
		});

		await fs.writeFile(
			path.resolve(projectPath, "src", "graphql", "remoteSchemaPossibleTypes.ts"),
			getFormattedCode(
				generatedFileHeaderContent + "export const possibleTypes = " + JSON.stringify(possibleTypesMap)
			)
		);
	} else {
		throw new Error(`Unexpected response ${JSON.stringify(responseData, undefined, 2)}`);
	}
};
