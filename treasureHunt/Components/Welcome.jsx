import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Vibration,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, Component } from 'react';

const { width, height } = Dimensions.get('window');
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
  image2: {
    flexDirection: 'column',
    height: '40%',
    left: -60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image3: {
    top: 300,
    left: 50,
    width: 300,
    height: 315,
    position: 'absolute',
  },
  imageStack: {
    width: width,
    height: height,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    position: 'absolute',
    marginLeft: '14%',
    marginTop: 250,
    zIndex: 3,
    elevation: 3,
  },
});

function Index(props) {
  return (
    <View style={styles.container}>
      <MaterialButtonViolet
        style={styles.materialButtonViolet}
      ></MaterialButtonViolet>
    </View>
  );
}

const Welcome = ({ navigation }) => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/power-up.wav')
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
  navigateGo = () => navigation.navigate('GamePage');
  vibeGo = () => Vibration.vibrate(duration);
  navigateBundle = () => {
    this.navigateGo();
    this.vibeGo();
    playSound();
  };

  locationGo = () => navigation.navigate('Locations');
  vibeGo = () => Vibration.vibrate(duration);
  locationBundle = () => {
    this.locationGo();
    this.vibeGo();
    playSound();
  };

  certificateGo = () => navigation.navigate('Certificate');
  vibeGo = () => Vibration.vibrate(duration);
  certificateBundle = () => {
    this.certificateGo();
    this.vibeGo();
    playSound();
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole={'welcomePage'}
    >
      <View style={styles.imageStack}>
        <ImageBackground
          source={require('../assets/view-images/background.png')}
          resizeMode='contain'
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        >
          <Image
            source={require('../assets/view-images/park-life-logo.png')}
            resizeMode='contain'
            style={styles.image2}
            imageStyle={styles.image_imageStyle}
            accessible={true}
            accessibilityLabel={'logoImage'}
            accessibilityRole={'Welcome to Park Life'}
          ></Image>
          <TouchableOpacity
            style={styles.button}
            imageStyle={styles.image_imageStyle}
            accessible={true}
            accessibilityLabel={'Button'}
            accessibilityHint={'Click here to go to Hunt Location Page'}
            onPress={() => this.locationBundle()}
          >
            <Image source={require('../assets/view-images/getstarted.png')} />
          </TouchableOpacity>
        </ImageBackground>
        <Image
          source={require('../assets/welcome.png')}
          resizeMode='contain'
          style={styles.image3}
        ></Image>
      </View>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        ></ScrollView>
      </View>
    </View>
  );
};
export default Welcome;
