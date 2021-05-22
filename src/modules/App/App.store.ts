import { makeVar } from "@apollo/client"

export type InputType = "POINTER" | "TOUCH"

export class AppStore {
	inputType = makeVar<InputType>("POINTER")
	isFocused = makeVar(true)
	isFocusVisible = makeVar(false)
}
