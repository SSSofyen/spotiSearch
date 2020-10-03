import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'

// importing reusable customisable 'homemade' components
import CustomButton from '../Components/CustomButton.js'
import CustomInput from '../Components/CustomInput.js'

// change ip to your local IP for functioning api calls
const ip = '192.168.1.10'

// component to render xhr response as list and navigate to albumScreen
// with artist data for processing down the road (in order to get albums)
const FlatListComponent = ({ navigation, artistTable }) => {
	// formatting the data to fit what the data property in flatlist expects
	const artistNamesTable = artistTable.map((entry) => {
		const key = { key: entry.name }
		return key
	})

	return (
		<View style={styles.container}>
			<FlatList
				data={artistNamesTable}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('Album', {
								artistName: item,
								artistTable
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

export default function SearchScreen({ navigation }) {
	// state to turn on conditional rendering for the search result's display
	const [searched, setSearched] = useState(false)
	// state to store the search field content
	const [searchContent, setSearchContent] = useState('')
	// state to store the api's response (artist name and id, 20 results at most)
	const [artistTable, setArtistTable] = useState({})

	// search button's function to fetch data according to the query
	async function _handleSearch() {
		try {
			axios({
				method: 'post',
				url: `http://${ip}:5000/api/search`,
				data: { artistQuery: searchContent }
			}).then(function (res) {
				setArtistTable(res.data)
				setSearched(true)
			})
		} catch (err) {
			console.log('err', err)
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('Album')}>
				<Text style={styles.item}>go to albums</Text>
			</TouchableOpacity>
			<Text style={styles.textcolor}>
				lookin for an artist ? try underneath =D
			</Text>
			<CustomInput
				placeholder='search field'
				value={searchContent}
				onChangeText={(value) => setSearchContent(value)}
			/>
			<CustomButton title='search' onPress={_handleSearch} />
			<StatusBar style='auto' />
			{searched ? (
				<FlatListComponent navigation={navigation} artistTable={artistTable} />
			) : null}
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
