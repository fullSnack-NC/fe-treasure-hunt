import { View, Text, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../css/style';
import currentWaypointStyles from '../css/currentWaypoint';
import { getWaypointByMapID } from '../utils/api';
import { Audio } from 'expo-av';
import waypointPositions from '../data/waypoints';
const geolib = require('geolib');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CurrentWaypoint = ({ navigation }) => {
	const [CurrentWaypoint_id, setCurrentWaypoint_id] = useState(0);
	const [sound, setSound] = React.useState();
	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/waypoint-beep.wav'));
		setSound(sound);
		await sound.playAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const durationA = 900;
	const durationB = 700;
	const durationC = 500;
	const durationD = 300;
	const durationE = 200;
	const durationF = 100;

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
	const [backgroundColor, setBackgroundColor] = useState('#B3EAF2');
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
			setBackgroundColor('#0662CE');
			setDistanceMsg('You’re freezing cold...brrrrrr');
		} else if (200 < distance && distance <= 300) {
			setBackgroundColor('#3781D7');
			setDistanceMsg('You’re cold');
			vibeGo(durationE);
			vibeGo(durationE);
			playSound();
			playSound();
		} else if (150 < distance && distance <= 200) {
			setBackgroundColor('#B3EAF2');
			setDistanceMsg("You're warm");
			vibeGo(durationD);
			vibeGo(durationD);
			playSound();
			playSound();
			playSound();
		} else if (80 < distance && distance <= 150) {
			setBackgroundColor('#FFC899');
			setDistanceMsg('It’s toasty warm');
			vibeGo(durationC);
			vibeGo(durationC);
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (40 < distance && distance <= 80) {
			setBackgroundColor('#FFAD66');
			setDistanceMsg('You’re quite hot now');
			vibeGo(durationB);
			vibeGo(durationB);
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (0 <= distance && distance < 40) {
			setBackgroundColor('#FF9232');
			setDistanceMsg('You’re red hot!');
			vibeGo(durationA);
			vibeGo(durationA);
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (0 === distance) {
			setBackgroundColor('#FF7700');
			setDistanceMsg('Scorching! You have arrived!');
			vibeGo(durationA);
			vibeGo(durationA);
			vibeGo(durationA);
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
		}

		const timer = setTimeout(() => {
			getLocation();
		}, 2000);

		return () => clearTimeout(timer);
	}, [location, region, distance]);

	const incrementAcorn = () => {
		const acorn = (
			<Image key={CurrentWaypoint_id} style={currentWaypointStyles.acorn} source={require('../assets/acorn.png')} />
		);
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
						backgroundColor: backgroundColor,
					},
				]}
			>
				<View style={currentWaypointStyles.imageStack}>
					<ImageBackground
						source={require('../assets/fullSnack-background-clear.png')}
						resizeMode='contain'
						style={currentWaypointStyles.image}
					></ImageBackground>
					<View style={currentWaypointStyles.clueSwipe}>
						<Image
							source={waypointPositions[CurrentWaypoint_id].imgPath}
							resizeMode='cover'
							style={currentWaypointStyles.clueImage}
						/>
						<Text style={currentWaypointStyles.clueSwipeInstruction}>Can you find this place?</Text>
						<Image style={currentWaypointStyles.clueSwipeBtn} source={require('../assets/swipe_right.png')} />
					</View>
				</View>
			</View>
			<View
				// pointerEvents='none'
				style={{
					paddinngVertical: 0,
					flex: 1,
					flexDirection: 'column',
					height: screenHeight,
					width: screenWidth,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: backgroundColor,
				}}
			>
				<ImageBackground
					source={require('../assets/fullSnack-background-clear.png')}
					resizeMode='contain'
					style={currentWaypointStyles.image}
				></ImageBackground>
				{location && (
					<View>
						<MapView
							style={currentWaypointStyles.mapView}
							provider={PROVIDER_GOOGLE}
							apiKey={apiKey}
							region={region}
							showsUserLocation={true}
							scrollEnabled={true}
							rotateEnabled={true}
							mapType='satellite'
						>
							<Marker coordinate={currentWaypointMarker} image={require('../assets/squirrel.png')} />
							<View style={currentWaypointStyles.mapData}>
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
									<Text style={currentWaypointStyles.smallTxt}>m</Text>
								</Text>
								<View style={currentWaypointStyles.mapData2}>
									<Text style={currentWaypointStyles.smallTxt}>{distanceMsg}</Text>
								</View>
								<View style={currentWaypointStyles.acornContainer}>{acornImgs}</View>
							</View>
							<View>
								{distance < 40 && (
									<TouchableOpacity style={[styles.mapBtn]} onPress={() => handlePress()}>
										<View style={currentWaypointStyles.woodenBtn}>
											<Image source={require('../assets/view-images/foundButton.png')} />
											{/* <Text style={currentWaypointStyles.mapBtnText}>Found this place</Text> */}
										</View>
									</TouchableOpacity>
								)}
							</View>
						</MapView>
					</View>
				)}
				<View>
					<Image style={currentWaypointStyles.mapSwipeBtn} source={require('../assets/swipe_left.png')} />
				</View>
			</View>
		</ScrollView>
	);
};
export default CurrentWaypoint;
