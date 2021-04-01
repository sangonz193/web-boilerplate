import { Breakpoint } from "./Breakpoint"

export const getMaxWidthSelector = (b: keyof typeof Breakpoint) => `@media (max-width: ${Breakpoint[b] - 1}px)`
