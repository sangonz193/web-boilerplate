import { registerIcons } from "@fluentui/style-utilities"

function HomeIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M400 179L400 64 352 64 352 133"
			></path>
		</svg>
	)
}

export const HOME_ICON_NAME = "Home"

registerIcons({
	icons: {
		[HOME_ICON_NAME]: <HomeIcon />,
	},
})
