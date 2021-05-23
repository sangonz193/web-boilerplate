import { Stack } from "@fluentui/react"
import React from "react"

import { Header } from "../Header"
import { Navbar } from "../Navbar"
import { LayoutContext, LayoutContextValue, LayoutOptions, SetLayoutOptions } from "./Layout.context"
import { useLayoutStyles } from "./useLayoutStyles"

export type LayoutProps = LayoutOptions & {
	children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props
	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<SetLayoutOptions>()

	const contextValue = React.useMemo<LayoutContextValue>(() => {
		return {
			setLayoutOptions: setOverriddenLayoutOptions,
		}
	}, [])

	const layoutOptionsWithOverrides = React.useMemo(() => {
		return typeof overriddenLayoutOptions === "function"
			? overriddenLayoutOptions({ ...props })
			: overriddenLayoutOptions
	}, [overriddenLayoutOptions, props])

	const styles = useLayoutStyles({
		className: layoutOptionsWithOverrides?.className,
	})

	return (
		<LayoutContext.Provider value={contextValue}>
			<Stack className={styles.wrapper}>
				<Stack className={styles.contentAndHeaderContainer}>
					<Header title={layoutOptionsWithOverrides?.headerTitle} />
					<Stack className={styles.componentContainer}>{children}</Stack>
				</Stack>

				<Navbar />
			</Stack>
		</LayoutContext.Provider>
	)
}
