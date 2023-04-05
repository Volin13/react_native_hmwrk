import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DefaultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PostsScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 22,
    marginBottom: 20,
  },
});

export default DefaultScreen;
