import { getParks } from '../utils/api';
import React, { useEffect, useState, Component } from 'react';

import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ScrollView,
} from 'react-native';
const { width, height } = Dimensions.get('window');

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
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/view-images/background.png')}
				resizeMode='contain'
				style={styles.image}
				imageStyle={styles.image_imageStyle}
			>
				<ScrollView>
					<View>
						{/* <Image
						source={require('../assets/view-images/park-life-logo.png')}
						resizeMode='contain'
						style={styles.image2}
					></Image> */}

						{locations.map((location) => {
							const amenities = JSON.parse(location.amenities);
							const park_id = location.park_id;
							return (
								<View
									key={park_id}
									style={[
										cardStyles.container,
										styles.materialCardWithImageAndTitle,
									]}
								>
									<View style={cardStyles.cardBody}>
										<View style={cardStyles.bodyContent}>
											<Text style={cardStyles.titleStyle}>
												{location.park_name}
											</Text>
											<Text style={cardStyles.subtitleStyle}>
												{amenities.accessible ? (
													<Text>Accessible 🦽</Text>
												) : null}
												{amenities.lake ? <Text>Lake! 💧</Text> : null}
												{amenities.wildlife ? <Text>Wildlife! 🦔</Text> : null}
												{amenities.toilet ? <Text>Toilet! 🚻</Text> : null}
												{amenities.food ? <Text>Food! 🍦</Text> : null}
											</Text>
										</View>
										<Image
											style={cardStyles.cardItemImagePlace}
											source={parkImage[park_id - 1].image}
										></Image>
									</View>
									<Button
										title='Map List'
										onPress={() =>
											navigation.push('HuntList', { park_id: park_id })
										}
									/>
								</View>
							);
						})}
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
	},
	image_imageStyle: {},
	// image2: {
	// 	flexDirection: 'column',
	// 	height: '40%',
	// 	left: -60,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// },
	materialCardWithImageAndTitle: {
		// height: 166,
		width: 359,
		// top: 152,
		left: 0,
	},
	image2Stack: {
		width: 359,
		height: 318,
		marginTop: 57,
		marginLeft: 79,
	},
	loremIpsum4: {
		fontFamily: 'roboto-regular',
		color: '#121212',
		marginTop: 228,
		marginLeft: 246,
	},
});

const cardStyles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 23,
		borderColor: '#CCC',
		flexWrap: 'nowrap',
		backgroundColor: 'rgba(124,168,91,1)',
		shadowColor: '#000',
		shadowOffset: {
			width: -2,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		overflow: 'hidden',
		opacity: 0.8,
	},
	cardBody: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 357,
		top: 1,
		height: 150,
	},
	bodyContent: {
		padding: 16,
		paddingTop: 24,
		flex: 1,
	},
	titleStyle: {
		fontSize: 24,
		color: '#000',
		paddingBottom: 12,
	},
	subtitleStyle: {
		fontSize: 14,
		color: '#000',
		lineHeight: 16,
		opacity: 0.5,
	},
	cardItemImagePlace: {
		backgroundColor: '#ccc',
		height: 117,
		width: 159,
		margin: 16,
		borderRadius: 19,
	},
});

export default Locations;
