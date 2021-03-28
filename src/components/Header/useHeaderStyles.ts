import { IStyle, makeStyles } from "@fluentui/react"

import { HeaderState, HeaderStyles } from "./Header.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles<{ [K in keyof HeaderStyles]: IStyle }>((theme) => {
	return {
		wrapper: {},

		title: {},

		right: {},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useHeaderStyles(state: HeaderState): HeaderStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		title: styles.title,
		right: styles.right,
	}
}
