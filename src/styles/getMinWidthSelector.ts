import { Breakpoint } from "./Breakpoint"

export const getMinWidthSelector = (b: keyof typeof Breakpoint) => `@media (min-width: ${Breakpoint[b]}px)`
