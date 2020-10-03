import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'

// change ip to your local IP for functioning api calls
const ip = '192.168.1.10'

const FlatListComponent = ({ navigation, albumTable }) => {
	// formatting the data to fit what the data property in flatlist expects
	const albumNamesTable = albumTable.map((entry) => {
		const key = { key: entry.name }
		return key
	})

	return (
		<View style={styles.container}>
			<FlatList
				data={albumNamesTable}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('Track', {
								albumName: item,
								albumTable
							})
						}>
						<LinearGradient
							colors={['#00FFFF', '#FF69B4']}
							style={{ borderRadius: 50 }}>
							<Text style={styles.item}>{item.key}</Text>
						</LinearGradient>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}

export default function AlbumScreen({ route, navigation }) {
	//state for conditional rendering
	const [loaded, setLoaded] = useState(false)
	//setting album data as state
	const [albumTable, setAlbumTable] = useState({})

	// bringing in params from react navigation for album route call
	const { artistName } = route.params
	const { artistTable } = route.params

	useEffect(() => {
		// finding id comparing matching names
		// using for loop instead of .map so we can break out early
		for (var i = 0; i < artistTable.length; i++) {
			if (artistName.key === artistTable[i].name) {
				const artistId = artistTable[i].id
				axios({
					method: 'post',
					url: `http://${ip}:5000/api/search/albums`,
					data: { artistId: artistId }
				}).then(function (res) {
					setAlbumTable(res.data)
					setLoaded(true)
				})
			}
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.textcolor}>here are your albums :</Text>
			{loaded ? (
				<FlatListComponent navigation={navigation} albumTable={albumTable} />
			) : null}
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		backgroundColor: '#FF69B4',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textcolor: {
		color: '#00FFFF'
	},

	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: 'rgba(247,247,247,1.0)'
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: '#FFFFFF'
	}
})
