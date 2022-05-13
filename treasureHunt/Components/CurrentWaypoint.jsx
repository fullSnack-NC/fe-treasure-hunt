import { ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import waypointPositions from '../data/waypoints';
import Clue from '../Components/Clue';
import Map from '../Components/Map';
const geolib = require('geolib');

const CurrentWaypoint = ({ navigation }) => {
	const [CurrentWaypoint_id, setCurrentWaypoint_id] = useState(0);
	const [sound, setSound] = React.useState();
	const [backgroundColor, setBackgroundColor] = useState('#B3EAF2');
	const [distanceMsg, setDistanceMsg] = useState('');
	const [currentWaypointMarker, setcurrentWaypointMarker] = useState(
		waypointPositions[0]
	);
	const duration = (num) => num * 100;

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/sounds/waypoint-beep.wav')
		);
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
	const [errorMsg, setErrorMsg] = useState(null);
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
			vibeGo(duration(2));
			vibeGo(duration(2));
			playSound();
			playSound();
		} else if (150 < distance && distance <= 200) {
			setBackgroundColor('#B3EAF2');
			setDistanceMsg("You're warm");
			vibeGo(duration(3));
			vibeGo(duration(3));
			playSound();
			playSound();
			playSound();
		} else if (80 < distance && distance <= 150) {
			setBackgroundColor('#FFC899');
			setDistanceMsg('It’s toasty warm');
			vibeGo(duration(5));
			vibeGo(duration(5));
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (40 < distance && distance <= 80) {
			setBackgroundColor('#FFAD66');
			setDistanceMsg('You’re quite hot now');
			vibeGo(duration(7));
			vibeGo(duration(7));
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (0 <= distance && distance < 40) {
			setBackgroundColor('#FF9232');
			setDistanceMsg('You’re red hot!');
			vibeGo(duration(9));
			vibeGo(duration(9));
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
			playSound();
		} else if (0 === distance) {
			setBackgroundColor('#FF7700');
			setDistanceMsg('Scorching! You have arrived!');
			vibeGo(duration(9));
			vibeGo(duration(9));
			vibeGo(duration(9));
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

	let text = 'Waiting..';

	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<ScrollView horizontal={true} pagingEnabled={true}>
			<Clue
				CurrentWaypoint_id={CurrentWaypoint_id}
				backgroundColor={backgroundColor}
			/>
			<Map
				distance={distance}
				distanceMsg={distanceMsg}
				location={location}
				region={region}
				backgroundColor={backgroundColor}
				setcurrentWaypointMarker={setcurrentWaypointMarker}
				currentWaypointMarker={currentWaypointMarker}
				setCurrentWaypoint_id={setCurrentWaypoint_id}
				CurrentWaypoint_id={CurrentWaypoint_id}
			></Map>
		</ScrollView>
	);
};
export default CurrentWaypoint;
