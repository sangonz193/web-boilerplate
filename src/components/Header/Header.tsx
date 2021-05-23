import { Stack, Text } from "@fluentui/react"
import React from "react"

import { useHeaderStyles } from "./useHeaderStyles"

export type HeaderProps = {
	children?: undefined
	className?: string
	title?: string
	right?: React.ReactNode
}

const TextH1 = Text.bind({})
TextH1.defaultProps = {
	...TextH1.defaultProps,
	as: "h1",
}

const HeaderComponent: React.FC<HeaderProps> = ({ className, title, right }) => {
	const styles = useHeaderStyles({
		className,
	})

	return (
		<Stack className={styles.wrapper}>
			<TextH1 className={styles.title}>{title}</TextH1>
			{right}
		</Stack>
	)
}

export const Header = React.memo(HeaderComponent)
