import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currentWaypointStyles from '../css/currentWaypointStyles';
import waypointPositions from '../data/waypoints';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Map = ({
	distance,
	distanceMsg,
	backgroundColor,
	location,
	region,
	setcurrentWaypointMarker,
	currentWaypointMarker,
	setCurrentWaypoint_id,
	CurrentWaypoint_id,
}) => {
	const [acorns, setAcorns] = useState(0);
	const [acornImgs, setAcornImgs] = useState([]);
	const apiKey = REACT_APP_MAPS_API_KEY;

	const incrementAcorn = () => {
		const acorn = (
			<Image
				key={CurrentWaypoint_id}
				style={currentWaypointStyles.acorn}
				source={require('../assets/acorn.png')}
			/>
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

	return (
		<View
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
						<Marker
							coordinate={currentWaypointMarker}
							image={require('../assets/squirrel.png')}
						/>
						<View style={currentWaypointStyles.mapData}>
							<Text
								style={{
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
							<Text style={currentWaypointStyles.smallTxt}>{distanceMsg}</Text>
						</View>
						<View style={currentWaypointStyles.acornContainer}>
							{acornImgs}
						</View>
						<View style={currentWaypointStyles.mapBtn}>
							{distance < 40 && (
								<TouchableOpacity
									// style={currentWaypointStyles.mapBtn}
									onPress={() => handlePress()}
								>
									<Image
										source={require('../assets/view-images/foundButton.png')}
										style={currentWaypointStyles.btnImg}
									/>
								</TouchableOpacity>
							)}
						</View>
					</MapView>
				</View>
			)}
			<View>
				<Image
					style={currentWaypointStyles.mapSwipeBtn}
					source={require('../assets/swipe_left.png')}
				/>
			</View>
		</View>
	);
};

export default Map;
