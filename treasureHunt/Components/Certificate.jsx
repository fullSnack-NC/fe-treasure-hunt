import { View, Text, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeImage: {
    flex: 1,
    width: '80%',
  },
  button: {
    width: '70%',
    backgroundColor: 'blue',
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
      <Text>Certificate</Text>
      <Image
        style={styles.welcomeImage}
        source={require('../assets/CertificateSplash.png')}
        resizeMode='contain'
      />
      <Text>Good work park explorer!!!!!</Text>
    </View>
  );
};
export default Certificate;
