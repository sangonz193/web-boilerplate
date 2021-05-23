import { action } from "@storybook/addon-actions"
import { Meta, Story } from "@storybook/react"
import identity from "lodash/identity"
import React from "react"

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf"
import { mergeFunctions } from "../../_utils/mergeFunctions"
import { StorybookArgTypes } from "../_utils/StorybookArgTypes"
import { FileInput, FileInputProps } from "./FileInput"

type StoryProps = Pick<FileInputProps, "errorMessage" | "label">

const argTypes = identity<StorybookArgTypes<StoryProps>>({
	label: {
		defaultValue: "Add file",
		control: {
			type: "text",
		},
	},

	errorMessage: {
		control: {
			type: "text",
		},
	},
})

export default identity<Meta<StoryProps>>({
	title: "FileInput",
	component: FileInput,
	argTypes,
	parameters: {
		controls: {
			include: dangerousKeysOf(
				identity<Record<keyof StoryProps, 0>>({
					label: 0,
					errorMessage: 0,
				})
			),
		},
	},
})

const Template: Story<StoryProps> = (props) => {
	const [file, setFile] = React.useState<File>()

	return (
		<div style={{ maxWidth: 300 }}>
			<FileInput {...props} value={file} onChange={mergeFunctions(action("onChange"), setFile)} />
		</div>
	)
}

export const Default = Template.bind({})
