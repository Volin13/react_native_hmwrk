import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.coords;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="Location"
          coordinate={{ latitude, longitude }}
          description="Location"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 22,
    marginBottom: 20,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
