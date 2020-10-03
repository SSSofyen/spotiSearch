import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

const CustomInput = (props) => {
	const { label, input, containerStyle } = styles

	return (
		<Input
			{...props}
			containerStyle={containerStyle}
			placeholderTextColor='rgba(255, 255, 255, 0.3)'
			labelStyle={label}
			inputStyle={input}
		/>
	)
}

// Styles
const styles = StyleSheet.create({
	containerStyle: {
		marginBottom: 20
	},
	label: {
		color: 'rgb(255, 255, 255)',
		fontSize: 14
	},
	input: {
		color: 'rgb(255, 255, 255)'
	}
})

export default CustomInput
