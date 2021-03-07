import { appConfig } from "../config/app.config"

export const graphqlConfig = {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	uri: appConfig.backendUrl + (appConfig.backendUrl.endsWith("/") ? "" : "/") + "graphql",
}
