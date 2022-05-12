import {
	View,
	Text,
	Button,
	Dimensions,
	ImageBackground,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	button: {
		width: '70%',
		backgroundColor: 'blue',
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
	},
	acornContainer: {
		flex: 0.25,
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'stretch',
		marginLeft: 75,
		marginRight: 75,
		marginTop: 25,
		marginBottom: 25,
	},
	acorn: {
		//flexDirection: 'row',
		height: '25%',
		//left: -60,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	image3: {
		top: 300,
		left: 30,
		width: 345,
		height: 362,
		position: 'absolute',
	},
	imageStack: {
		width: width,
		height: height,
	},

	handoverTextContainer: {
		backgroundColor: '#7CA85B',
		width: '70%',
		flex: 0.25,
		marginLeft: '15%',
		marginTop: '20%',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 12,
		paddingBottom: 12,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderRadius: 20,
	},
	handoverText: {
		fontSize: 18,
		color: '#ffffff',
		textAlign: 'center',
	},
});

const Certificate = ({ navigation }) => {
	const [sound, setSound] = React.useState();
	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/sounds/certificate-celebration.wav')
		);
		setSound(sound);
		await sound.playAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const duration = 1000;
	return (
		<View style={styles.container}>
			<View style={styles.imageStack}>
				<ImageBackground
					source={require('../assets/view-images/background.png')}
					resizeMode='contain'
					style={styles.image}
				></ImageBackground>
				<Image
					source={require('../assets/CertificateSplash.png')}
					resizeMode='contain'
					style={styles.image3}
				></Image>

				<View style={styles.handoverTextContainer}>
					<Text style={styles.handoverText}>
						Well done for completing the Roundhay Park Treasure Hunt!
					</Text>
					<Text style={styles.handoverText}>You collected 5 acorns.</Text>
				</View>
				<View style={styles.acornContainer}>
					<Image
						source={require('../assets/acorn.png')}
						resizeMode='contain'
						style={styles.acorn}
					></Image>
					<Image
						source={require('../assets/acorn.png')}
						resizeMode='contain'
						style={styles.acorn}
					></Image>
					<Image
						source={require('../assets/acorn.png')}
						resizeMode='contain'
						style={styles.acorn}
					></Image>
					<Image
						source={require('../assets/acorn.png')}
						resizeMode='contain'
						style={styles.acorn}
					></Image>
					<Image
						source={require('../assets/acorn.png')}
						resizeMode='contain'
						style={styles.acorn}
					></Image>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.push('Welcome')}
				>
					<Image source={require('../assets/view-images/BackHomeButton.png')} />
				</TouchableOpacity>
				{/* <Button
          style={styles.button}
          title='Back to Home'
          onPress={() => navigation.push('Welcome')}
        /> */}
			</View>
		</View>
	);
};
export default Certificate;
