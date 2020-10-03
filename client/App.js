import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Import screens
import SearchScreen from './screens/searchScreen'
import AlbumScreen from './screens/albumScreen'
import TrackScreen from './screens/trackScreen'

const Stack = createStackNavigator()

const StackNavigator = (
	<NavigationContainer>
		<Stack.Navigator initialRouteName='Search'>
			<Stack.Screen name='Search' component={SearchScreen} />
			<Stack.Screen name='Album' component={AlbumScreen} />
			<Stack.Screen name='Track' component={TrackScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

class App extends React.Component {
	render() {
		return StackNavigator
	}
}

export default App
