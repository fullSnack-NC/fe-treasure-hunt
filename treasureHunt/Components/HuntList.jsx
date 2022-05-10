import { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getMapsByParkID } from '../utils/api';

const HuntList = ({ route, navigation }) => {
  const [maps, setMaps] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { park_id } = route.params;

  useEffect(() => {
    getMapsByParkID(park_id)
      .then((data) => {
        setMaps(data);
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
    return <Text>Maps Loading...</Text>;
  }

  if (error) {
    return <Text>Parks not found</Text>;
  }
  return (
    <View>
      {maps.map((map) => {
        console.log(map);
        return (
          <View key={map.map_id}>
            <Text>{map.map_name}</Text>
            {/* if (map.map_id === 1) return (
            <Image
              source={require(`../assets/map-images/1.jpeg`)}
              style={{ height: 50, width: 150 }}
            />
            else if (map.map_id === 2) return (
            <Image
              source={require(`../assets/map-images/2.jpeg`)}
              style={{ height: 50, width: 150 }}
            />
            else if (map.map_id === 3) return (
            <Image
              source={require(`../assets/map-images/3.jpeg`)}
              style={{ height: 50, width: 150 }}
            /> */}
            <Text>{map.length} KM</Text>
            <Text>{map.est_comp_time} mins</Text>
            <Text>Suitable for {map.age_min} +</Text>
            <Button
              title='Select this Hunt'
              onPress={() =>
                navigation.push('GameLaunchHandover', { map_id: map.map_id })
              }
            />
          </View>
        );
      })}
    </View>
  );
};
export default HuntList;
