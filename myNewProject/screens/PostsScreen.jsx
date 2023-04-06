import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
import LogOutBtn from '../reusableComponents/LogOutButton';
import CommentsScreen from './CommentsScreen';
import MapScreen from '../screens/MapScreen';
import HomeScreen from './HomeScreen';

const PostsScreen = () => {
  const PostsStack = createNativeStackNavigator();
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Posts"
                contWrp={{ paddingRight: Platform.OS == 'android' ? 30 : 10 }}
              />
            );
          },
          headerTitleAlign: 'center',
          headerRight: () => {
            return <LogOutBtn />;
          },
        }}
        name="Posts"
        component={HomeScreen}
      />
      <PostsStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Coments"
                contWrp={{ paddingRight: Platform.OS == 'android' ? 140 : 90 }}
              />
            );
          },
          headerTitleAlign: 'center',
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <PostsStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Location"
                contWrp={{ paddingRight: Platform.OS == 'android' ? 140 : 100 }}
              />
            );
          },
          headerTitleAlign: 'center',
        }}
        name="Maps"
        component={MapScreen}
      />
    </PostsStack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostsScreen;
