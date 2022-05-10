import { View, Text } from 'react-native';

const Certificate = () => {
  return (
    <View>
      <Text>Certificate</Text>
      <Image
        style={styles.welcomeImage}
        source={require('../assets/welcome.png')}
        resizeMode='contain'
      />
      <Text>Good work park explorer!!!!!</Text>
    </View>
  );
};
export default Certificate;
