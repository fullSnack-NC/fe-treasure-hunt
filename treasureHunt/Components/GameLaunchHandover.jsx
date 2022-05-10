import { View, Text, Button } from 'react-native';

const GameLaunchHandover = ({ navigation }) => {
	return (
		<View>
			<Text>GameLaunchHandover</Text>
			<Button title='CluePage' onPress={() => navigation.push('CluePage')} />
		</View>
	);
};
export default GameLaunchHandover;
