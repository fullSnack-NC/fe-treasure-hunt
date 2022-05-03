import { View, Text, Button } from 'react-native';

const Welcome = ({ navigation }) => {
	return (
		<View>
			<Text>welcome</Text>
			<Button title='Locations' onPress={() => navigation.navigate('Locations')} />
		</View>
	);
};
export default Welcome;
