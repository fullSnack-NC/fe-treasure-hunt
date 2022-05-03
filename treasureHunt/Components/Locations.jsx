import { View, Text } from 'react-native';
import LocationCard from './LocationCard';
const Locations = ({ navigation }) => {
	return (
		<View>
			<LocationCard />
			<LocationCard />
			<LocationCard />
			<Text>Locations</Text>
		</View>
	);
};
export default Locations;
