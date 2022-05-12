import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import globalStyles from '../css/style';
import currentWaypointStyles from '../css/currentWaypointStyles';
import waypointPositions from '../data/waypoints';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Clue = ({ CurrentWaypoint_id, backgroundColor }) => {
	return (
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
					<Text style={currentWaypointStyles.clueSwipeInstruction}>
						Can you find this place?
					</Text>
					<Image
						style={currentWaypointStyles.clueSwipeBtn}
						source={require('../assets/swipe_right.png')}
					/>
				</View>
			</View>
		</View>
	);
};

export default Clue;
