import {
	View,
	Text,
	Image,
	ScrollView,
	Dimensions,
	Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../css/style';

const CluePage = ({ navigation }) => {
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	return (
		<View>
			<Text>HELLO CLUE PAGE!!!</Text>
			<Image
				source={require('../assets/waypoint-images/Waypoint_1_Roundhay_Park.png')}
				resizeMode='contain'
				style={{
					flex: 1,
					height: '90%',
					width: screenWidth,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			/>
			<Button
				title='Back to Map'
				onPress={() => navigation.push('GamePage')}
			></Button>
		</View>
	);
};

export default CluePage;
