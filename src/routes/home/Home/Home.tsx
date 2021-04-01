import React from "react"

import { useHomeStyles } from "./useHomeStyles"

export type HomeProps = {
	children?: undefined
}

const HomeComponent: React.FC<HomeProps> = () => {
	const styles = useHomeStyles()

	return <div className={styles.wrapper}>This is the home screen.</div>
}

export const Home = React.memo(HomeComponent)
