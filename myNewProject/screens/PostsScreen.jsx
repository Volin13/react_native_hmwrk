import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, color: '#FF6C00' }}>Posts Screen</Text>
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

export default PostsScreen;
