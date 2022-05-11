import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../css/style';
import { getWaypointByMapID } from '../utils/api';
const geolib = require('geolib');

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	button: {
		position: 'absolute',
		left: 0,
		bottom: 50,
		zIndex: 999,
	},
	acornContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		flexDirection: 'column-reverse',
	},
	acorn: {
		height: 40,
		width: 40,
		marginTop: 5,
		borderRadius: 10,
	},
	smallTxt: {
		fontSize: 20,
		fontWeight: '400',
		paddingLeft: 10,
		lineHeight: 20,
		color: '#fff',
	},
});

const CurrentWaypoint = ({ navigation }) => {
	const [CurrentWaypoint_id, setCurrentWaypoint_id] = useState(0);
	const waypointPositions = [
		{
			wayPoint_id: 1,
			latitude: 53.838172,
			longitude: -1.503277,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			imgPath: require('../assets/waypoint-images/1_1.png'),
		},
		{
			wayPoint_id: 2,
			latitude: 53.837907,
			longitude: -1.499438,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			imgPath: require('../assets/waypoint-images/1_2.png'),
		},
		{
			wayPoint_id: 3,
			latitude: 53.83561,
			longitude: -1.497038,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			imgPath: require('../assets/waypoint-images/1_3.png'),
		},
		{
			wayPoint_id: 4,
			latitude: 53.837088,
			longitude: -1.495215,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			imgPath: require('../assets/waypoint-images/1_4.png'),
		},
		{
			wayPoint_id: 5,
			latitude: 53.839485,
			longitude: -1.497238,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			imgPath: require('../assets/waypoint-images/1_5.png'),
		},
	];
	const [isLoading, setIsLoading] = useState(true);
	const [currentWaypointMarker, setcurrentWaypointMarker] = useState(waypointPositions[0]);
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [region, setRegion] = useState({
		latitude: 53.839277,
		longitude: -1.496882,
		latitudeDelta: 0.003922,
		longitudeDelta: 0.003421,
	});
	const [acorns, setAcorns] = useState(0);
	const [acornImgs, setAcornImgs] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const apiKey = REACT_APP_MAPS_API_KEY;
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const distance = geolib.getDistance(
		{
			latitude: location.latitude,
			longitude: location.longitude,
		},
		{
			latitude: currentWaypointMarker.latitude,
			longitude: currentWaypointMarker.longitude,
		}
	);
	const [backgroundColor, setBackgroundColor] = useState('#2B4279');
	const [distanceMsg, setDistanceMsg] = useState('');

	useEffect(() => {
		async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
		};
		const getLocation = async () => {
			const location = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
			setRegion({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.003922,
				longitudeDelta: 0.003421,
			});
		};

		if (300 < distance && distance <= 500) {
			setBackgroundColor('#2B4279');
			setDistanceMsg('You’re freezing cold…brrrrrr');
		} else if (200 < distance && distance <= 300) {
			setBackgroundColor('#65428C');
			setDistanceMsg('You’re cold');
		} else if (150 < distance && distance <= 200) {
			setBackgroundColor('#A1378B');
			setDistanceMsg("You're warm");
		} else if (80 < distance && distance <= 150) {
			setBackgroundColor('#D42374');
			setDistanceMsg('It’s toasty warm');
		} else if (40 < distance && distance <= 80) {
			setBackgroundColor('#F62B4C');
			setDistanceMsg('You’re quite hot… be careful you don’t burn');
		} else if (0 <= distance && distance < 40) {
			setBackgroundColor('#FF5800');
			setDistanceMsg('You’re red hot!');
		} else if (0 === distance) {
			setBackgroundColor('#FF5800');
			setDistanceMsg('Scorching! You have arrived!');
		}

		const timer = setTimeout(() => {
			getLocation();
		}, 2000);

		return () => clearTimeout(timer);
	}, [location, region, distance]);

	// useEffect(() => {
	// 	getWaypointByMapID(map_id)
	// 		.then((data) => {
	// 			setWaypoints(data);
	// 			setIsLoading(false);
	// 			setErrorMsg(null);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.response.data);
	// 			setErrorMsg({ err });
	// 			setIsLoading(false);
	// 		});
	// }, []);

	const incrementAcorn = () => {
		const acorn = <Image key={CurrentWaypoint_id} style={styles.acorn} source={require('../assets/acorn.png')} />;
		setAcorns((currAcorns) => currAcorns + 1);
		setAcornImgs((currAcorns) => {
			const existingAcorns = [...currAcorns];
			return [existingAcorns, acorn];
		});
	};
	const handlePress = () => {
		let newID = CurrentWaypoint_id + 1;
		incrementAcorn();
		if (newID >= waypointPositions.length) {
			setTimeout(() => {
				navigation.navigate('Certificate');
			}, 2000);
			return;
		}
		console.log(CurrentWaypoint_id, 'CurrentWaypoint_id');
		setCurrentWaypoint_id(newID);
		setcurrentWaypointMarker(waypointPositions[newID]);
	};
	let text = 'Waiting..';

	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<ScrollView horizontal={true} pagingEnabled={true}>
			<View
				style={[
					globalStyles.container,
					{
						flex: 1,
						width: screenWidth,
						height: screenHeight,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}
			>
				<Image
					source={waypointPositions[CurrentWaypoint_id].imgPath}
					resizeMode='cover'
					style={{
						flex: 1,
						height: '80%',
						width: screenWidth - 40,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				/>
				<TouchableOpacity style={[globalStyles.baseBtn]}>
					<Text style={globalStyles.btnText}>Find the next treasure</Text>
				</TouchableOpacity>
			</View>
			<View
				// pointerEvents='none'
				style={{
					paddingVerticle: 50,
					flex: 1,
					flexDirection: 'column',
					height: screenHeight,
					width: screenWidth,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: backgroundColor,
				}}
			>
				{location && (
					<MapView
						style={{
							position: 'relative',
							height: screenHeight - 100,
							width: screenWidth - 50,
							borderWidth: 2,
							borderColor: 'white',
							borderRadius: 25,
							// justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
						}}
						provider={PROVIDER_GOOGLE}
						apiKey={apiKey}
						region={region}
						showsUserLocation={true}
						scrollEnabled={true}
						rotateEnabled={true}
						mapType='satellite'
					>
						<Marker coordinate={currentWaypointMarker} />
						<Text
							style={{
								// marginTop: 20,
								color: '#fff',
								fontSize: 60,
								fontWeight: '600',
								paddingLeft: 10,
								textAlign: 'left',
							}}
						>
							{distance}
							<Text style={styles.smallTxt}>m</Text>
						</Text>
						<Text style={styles.smallTxt}>{distanceMsg}</Text>
						<View style={styles.acornContainer}>{acornImgs}</View>
					</MapView>
				)}
				{distance < 40 && (
					<TouchableOpacity
						style={[
							globalStyles.baseBtn,
							// {
							// 	flex: 1,
							// 	position: 'absolute',
							// 	left: '-40%',
							// 	bottom: 0,
							// 	width: '80%',
							// 	height: 50,
							// 	zIndex: 10,
							// },
						]}
						onPress={() => handlePress()}
					>
						<Text style={globalStyles.btnText}>Found</Text>
					</TouchableOpacity>
				)}
				<Text> Swipe for Clue!⬅️ &lt;&lt;</Text>
			</View>
		</ScrollView>
	);
};
export default CurrentWaypoint;
