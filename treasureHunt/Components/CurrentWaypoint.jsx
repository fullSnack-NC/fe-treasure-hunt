import { View, Text, Button, Image, StyleSheet, ScrollView, AppRegistry, Dimensions } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const CurrentWaypoint = ({ navigation }) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const apiKey = REACT_APP_MAPS_API_KEY;
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = 'Waiting..';

	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<ScrollView horizontal={true} pagingEnabled={true}>
			<View>
				<Image
					source={require('../assets/waypoint-images/Waypoint_1_Roundhay_Park.png')}
					resizeMode='contain'
					style={{
						flex: 1,
						height: '90%',
						width: screenWidth,
						justifyContent: 'center',
						alignItems: 'center',
						// backgroundColor: 'tomato',
					}}
				/>
			</View>
			<View
				// pointerEvents='none'
				style={{
					flex: 1,
					height: screenHeight,
					width: screenWidth,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'blue',
				}}
			>
				<MapView
					style={{
						height: screenHeight - 40,
						width: screenWidth - 40,
					}}
					provider={PROVIDER_GOOGLE}
					apiKey={apiKey}
					showsUserLocation={true}
					scrollEnabled={false}
					minZoomLevel={15} // default => 0
					maxZoomLevel={16} // default => 20
					rotateEnabled={true}
					mapType='satellite'
				/>
			</View>
		</ScrollView>
	);
};
export default CurrentWaypoint;
