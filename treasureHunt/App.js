import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Components/Welcome';
import Locations from './Components/Locations';
import HuntList from './Components/HuntList';
import GameLaunchHandover from './Components/GameLaunchHandover';
import CurrentWaypoint from './Components/CurrentWaypoint';
import Certificate from './Components/Certificate';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, navigation } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: true }}>
				<Stack.Screen name='Welcome' component={Welcome} />
				<Stack.Screen
					name='Locations'
					component={Locations}
					navigation={navigation}
				/>
				<Stack.Screen
					name='HuntList'
					component={HuntList}
					navigation={navigation}
				/>
				<Stack.Screen
					name='GameLaunchHandover'
					component={GameLaunchHandover}
					navigation={navigation}
				/>
				<Stack.Screen
					name='CurrentWaypoint'
					component={CurrentWaypoint}
					navigation={navigation}
				/>
				<Stack.Screen name='Certificate' component={Certificate} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
