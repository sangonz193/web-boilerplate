import * as yup from "yup"

const { APP_NAME, BACKEND_URL, PUBLIC_URL } = yup
	.object({
		APP_NAME: yup.string().required(),
		BACKEND_URL: yup.string().required(),
		PUBLIC_URL: yup.string().default(""),
	})
	.required()
	.validateSync(process.env)

export const appConfig = {
	production: process.env.NODE_ENV === "production",
	name: APP_NAME,
	shortCodeName: "bp",
	backendUrl: BACKEND_URL,
	version: process.env.npm_package_version as string,
	storageScope: PUBLIC_URL.replace(/\/$/, "") || "/",
	historyBasename: PUBLIC_URL.replace(/\/$/, ""),
	baseUrl: location.origin.replace(/\/$/, ""),
}
