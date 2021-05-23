import robotoBold from "./Roboto-Bold.ttf"
import robotoRegular from "./Roboto-Regular.ttf"

export function registerFonts() {
	const head = document.getElementsByTagName("head")[0]
	const style = document.createElement("style")

	style.innerHTML = `
    @font-face {
        font-family: Roboto;
        src: url("${robotoRegular}");
    }
    @font-face {
        font-family: Roboto;
        src: url("${robotoBold}");
        font-weight: bold;
    }`
	head.appendChild(style)
}
