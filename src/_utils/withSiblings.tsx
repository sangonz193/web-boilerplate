import React from "react"

export const withSiblings = <TProps extends {}>(
	siblings: React.FC[],
	Component: React.ComponentType<TProps>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<React.ComponentType<TProps>>> =>
	React.forwardRef<React.ComponentType<TProps>, TProps>((props, ref) => (
		<>
			{siblings.map((Sibling, i) => (
				<Sibling key={i} />
			))}

			<Component ref={ref} {...props} />
		</>
	))
