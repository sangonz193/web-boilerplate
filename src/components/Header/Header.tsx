import { Text } from "@fluentui/react"
import React from "react"

import { Div } from "../Div"
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
		<Div className={styles.wrapper}>
			<TextH1 className={styles.title}>{title}</TextH1>
			{right}
		</Div>
	)
}

export const Header = React.memo(HeaderComponent)
