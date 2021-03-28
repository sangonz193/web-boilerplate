import { createComponent } from "../../../../components/_utils/createComponent"
import { HomeProps, HomeSlots, HomeState, HomeStyles } from "./Home.types"
import { renderHome } from "./renderHome"
import { useHomeSlots } from "./useHomeSlots"
import { useHomeState } from "./useHomeState"
import { useHomeStyles } from "./useHomeStyles"

export const Home = createComponent<HomeProps, HomeState, HomeSlots, HomeStyles>({
	name: "Home",
	useState: useHomeState,
	useStyles: useHomeStyles,
	useSlots: useHomeSlots,
	render: renderHome,
})
