import { CommandBarButton, css, DefaultButton, Label, mergeStyles, Stack, TextField } from "@fluentui/react"
import { useId } from "@fluentui/react-hooks"
import React from "react"
import { useDropzone } from "react-dropzone"
import { useResizeDetector } from "react-resize-detector"

import { CLOSE_CIRCLE_ICON_NAME } from "../Icon/CloseCircle.icon"
import { useFileInputStyles } from "./useFileInputStyles"

export type FileInputProps = {
	children?: undefined
	className?: string
	label: string | undefined
	value: File | undefined
	errorMessage?: string
	onChange: (file: File | undefined) => void
}

const FileInputComponent: React.FC<FileInputProps> = ({ className, label, value, errorMessage, onChange }) => {
	const { getRootProps, getInputProps, acceptedFiles, open, isDragActive } = useDropzone({ noClick: true })
	const selectedFile = acceptedFiles.length > 0 ? acceptedFiles[0] : undefined
	const fileInputId = useId()

	const [fieldWidth, setFieldWidth] = React.useState<number>()
	const handleResize = React.useCallback((width?: number) => {
		if (width !== undefined) {
			setFieldWidth(width)
		}
	}, [])

	const resizeDetectorTargetRef = React.useRef<HTMLDivElement>(null)
	useResizeDetector({
		targetRef: resizeDetectorTargetRef,
		skipOnMount: true,
		handleWidth: true,
		onResize: handleResize,
	})

	React.useEffect(() => {
		if (!selectedFile) {
			return
		}

		onChange(selectedFile)
	}, [selectedFile])

	const styles = useFileInputStyles({
		className,
	})

	const renderClearIcon = React.useCallback(() => {
		return (
			<CommandBarButton
				iconProps={{ iconName: CLOSE_CIRCLE_ICON_NAME, className: styles.clearIcon }}
				className={styles.clearButton}
				onClick={() => onChange(undefined)}
			/>
		)
	}, [styles.clearIcon, styles.clearButton, onChange])

	const [className2, setClassName] = React.useState<string>()

	React.useLayoutEffect(() => {
		setClassName(
			mergeStyles({
				"& .ms-TextField-errorMessage": {
					width: fieldWidth,
				},
			})
		)
	}, [fieldWidth])

	return (
		<Stack className={styles.wrapper}>
			<Label htmlFor={fileInputId} required>
				{label}
			</Label>

			<div {...getRootProps()} className={styles.dropzone}>
				<input {...getInputProps({ id: fileInputId })} />
				<div ref={resizeDetectorTargetRef} className={styles.fileNameContainer}>
					<TextField
						readOnly
						className={css(styles.fileNameTextField, className2)}
						value={isDragActive ? "Drop file..." : value?.name ?? ""}
						errorMessage={errorMessage}
						onRenderSuffix={value ? renderClearIcon : undefined}
					/>

					<Stack.Item disableShrink>
						<DefaultButton onClick={open} className={styles.selectFileButton}>
							Select file
						</DefaultButton>
					</Stack.Item>
				</div>
			</div>
		</Stack>
	)
}

export const FileInput = React.memo(FileInputComponent)
