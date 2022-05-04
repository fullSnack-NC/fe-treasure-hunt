import { View, Text, Button, Image, StyleSheet } from 'react-native';

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

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Treasure Hunt</Text>
      <Image
        style={styles.welcomeImage}
        source={require('../assets/welcome.png')}
        resizeMode='contain'
      />
      <Text>
        This is a game for young families to help children understand the world
        around them using maps
      </Text>
      <Button
        style={styles.button}
        title='Locations'
        onPress={() => navigation.navigate('Locations')}
      />
    </View>
  );
};
export default Welcome;
