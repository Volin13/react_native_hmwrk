import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CloudButton from '../reusableComponents/CloudButton';
import LocationButton from '../reusableComponents/LocationButton';

const Post = ({ title, coords, location, photo, navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image}></Image>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.containerWrapper}>
        <TouchableOpacity
          style={styles.commentWrapper}
          onPress={() => navigation.navigate('Comments')}
        >
          <CloudButton />
          <Text style={styles.textComment}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapWrapper}
          onPress={() => navigation.navigate('Maps', { coords })}
        >
          <LocationButton />
          <Text style={styles.mapText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  image: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: 240,
  },
  textTitle: {
    marginTop: 8,
    marginBottom: 8,

    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  containerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textComment: {
    marginLeft: 6,
    color: '#BDBDBD',
  },

  mapWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  mapText: {
    marginLeft: 6,
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});

export default Post;
