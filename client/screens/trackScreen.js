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

const FlatListComponent = ({ trackTable }) => {
	// formatting the data to fit what the data property in flatlist expects
	const trackNamesTable = trackTable.map((entry) => {
		const key = { key: entry.name }
		return key
	})

	return (
		<View style={styles.container}>
			<FlatList
				data={trackNamesTable}
				renderItem={({ item }) => (
					<LinearGradient
						colors={['#00FFFF', '#FF69B4']}
						style={{ borderRadius: 50 }}>
						<Text style={styles.item}>{item.key}</Text>
					</LinearGradient>
				)}
			/>
		</View>
	)
}

export default function TrackScreen({ route, navigation }) {
	//state for conditional rendering
	const [loaded, setLoaded] = useState(false)
	//setting track data as state
	const [trackTable, setTrackTable] = useState({})

	// bringing in params from react navigation for track route call
	const { albumName } = route.params
	const { albumTable } = route.params

	useEffect(() => {
		// finding id comparing matching names
		// using for loop instead of .map so we can break out early
		for (var i = 0; i < albumTable.length; i++) {
			if (albumName.key === albumTable[i].name) {
				const albumId = albumTable[i].id
				axios({
					method: 'post',
					url: `http://${ip}:5000/api/search/tracks`,
					data: { albumId: albumId }
				}).then(function (res) {
					setTrackTable(res.data)
					setLoaded(true)
				})
			}
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.textcolor}>here are your tracks :</Text>
			{loaded ? (
				<FlatListComponent navigation={navigation} trackTable={trackTable} />
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
