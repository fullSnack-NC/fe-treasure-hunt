import { View, Text, Button } from 'react-native';

const LocationCard = ({ navigation }) => {
	return (
		<View>
			<Text>Roundhay park</Text>
			<Text>Total Hunts : 1</Text>
			<Text>See more</Text>
			<Text>amenities</Text>
			<Button title='HuntList' onPress={() => navigation.pus('HuntList')} />
		</View>
	);
};
export default LocationCard;
