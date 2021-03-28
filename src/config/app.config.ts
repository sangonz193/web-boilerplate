import * as yup from "yup"

const validatedEnv = yup
	.object({
		BACKEND_URL: yup.string().required(),
	})
	.required()
	.validateSync(process.env)

export const appConfig = {
	backendUrl: validatedEnv.BACKEND_URL,
}
