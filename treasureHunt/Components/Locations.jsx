import { getParks } from '../utils/api';
import { useEffect, useState } from 'react';

import { View, Text, Button } from 'react-native';

const Locations = ({ navigation }) => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getParks()
			.then(({ parks }) => {
				setLocations(parks);
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				console.log(err.response.data);
				setError({ err });
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Text>Parks Loading...</Text>;
	}

	if (error) {
		return <Text>Parks not found</Text>;
	}
	return (
		<View>
			{locations.map((location) => {
				const amenities = JSON.parse(location.amenities);
				const park_id = location.park_id;
				return (
					<View key={park_id}>
						<Text>{location.park_name}</Text>
						{amenities.accessible ? <Text>Accessible 🦽</Text> : null}
						{amenities.lake ? <Text>Lake! 💧</Text> : null}
						{amenities.wildlife ? <Text>Wildlife! 🦔</Text> : null}
						{amenities.toilet ? <Text>Toilet! 🚻</Text> : null}
						{amenities.food ? <Text>Food! 🍦</Text> : null}
						<Button
							title='Map List'
							onPress={() => navigation.push('HuntList', { park_id: park_id })}
						/>
					</View>
				);
			})}
		</View>
	);
};
export default Locations;
