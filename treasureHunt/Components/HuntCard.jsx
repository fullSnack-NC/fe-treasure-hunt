import { View, Text, Button } from 'react-native';

const HuntCard = ({ navigation }) => {
	return (
		<View>
			{/* <View>Cover image from route/</View>
			<View>Map route</View> */}
			<Text>Amount of stops on route</Text>
			<Text>Length KM</Text>
			<Text>Estimated completion time?</Text>
			<Text>Difficulty/age range?</Text>
			<Text>Buggy friendly/Wheelchair accessible?</Text>
			<Button title='GameLaunchHandover' onPress={() => navigation.navigate('GameLaunchHandover')} />
		</View>
	);
};
export default HuntCard;
