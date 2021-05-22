import { makeStyles } from "@fluentui/react"

export type HomeStyleProps = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			padding: 20,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useHomeStyles(props: HomeStyleProps = {}) {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
