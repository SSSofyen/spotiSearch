import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
/*
    Stateless component hence without class but with props. Props can be for
    example button title etc.
*/

const CustomButton = (props) => {
	const { title } = props
	const { container, titleButton } = styles

	return (
		<TouchableOpacity {...props}>
			<LinearGradient colors={['#FF69B4', '#00FFFF']} style={container}>
				<Text style={titleButton}>{title}</Text>
			</LinearGradient>
		</TouchableOpacity>
	)
}

// Styles
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: hp('3%'),
		width: wp('50%'),
		height: hp('6%'),
		borderRadius: 50
	},
	titleButton: {
		fontSize: hp('2%'),
		color: 'rgb(255, 255, 255)'
	}
})

export default CustomButton
