import { getParks } from '../utils/api';
import { useEffect, useState } from 'react';

import { View, Text, Button, Image } from 'react-native';

const Locations = ({ navigation }) => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const parkImage = [
		{
			park_id: 1,
			image: require('../assets/park-images/1.jpeg'),
		},
		{
			park_id: 2,
			image: require('../assets/park-images/2.jpeg'),
		},
		{
			park_id: 3,
			image: require('../assets/park-images/3.jpeg'),
		},
		{
			park_id: 4,
			image: require('../assets/park-images/4.jpeg'),
		},
		{
			park_id: 5,
			image: require('../assets/park-images/5.jpeg'),
		},
	];

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
						<Image
							source={parkImage[park_id - 1].image}
							style={{ height: 50, width: 150 }}
						/>
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
