export function mergeFunctions<T extends (...args: any[]) => void>(...functions: T[]): T {
	return ((...args: any[]) => {
		functions.forEach((func) => func(...args))
	}) as T
}
