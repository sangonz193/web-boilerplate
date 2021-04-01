import React from "react"

import { useDivStyles } from "./useDivStyles"

export type DivProps = {
	children?: React.ReactNode
	className?: string
}

export const Div: React.FC<DivProps> = ({ children, className }) => {
	const styles = useDivStyles({
		className,
	})

	return <div className={styles.wrapper}>{children}</div>
}
