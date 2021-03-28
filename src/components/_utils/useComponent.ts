import React from "react"

export const useComponent = <TProps extends object, TRef>(render: React.ForwardRefRenderFunction<TRef, TProps>) => {
	const componentRef = React.useRef<
		React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<TRef>>
	>()
	const renderRef = React.useRef<React.ForwardRefRenderFunction<TRef, TProps>>(render)
	renderRef.current = render

	if (!componentRef.current) {
		componentRef.current = React.forwardRef<React.PropsWithoutRef<TProps> & React.RefAttributes<TRef>>(
			(props, ref) => {
				return renderRef.current(props as any, ref as any)
			}
		) as any
	}

	return componentRef.current
}
