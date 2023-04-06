import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './Header';
import { selectIsLoggedIn } from '../redux/auth/authSelectors';
import HomeButton from '../reusableComponents/HomeButton';
import NewPostButton from '../reusableComponents/NewPostButton';
import LogOutBtn from '../reusableComponents/LogOutButton';
import ProfileBtn from '../reusableComponents/ProfileButton';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <HomeButton />;
          },
          headerShown: false,
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Create a post"
                contWrp={{ paddingRight: Platform.OS == 'android' ? 0 : 10 }}
              />
            );
          },
          headerTitleAlign: 'center',
          headerRight: () => {
            return <LogOutBtn />;
          },
          tabBarIcon: () => {
            return <NewPostButton />;
          },
          tabBarShowLabel: false,
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="User profile"
                contWrp={{ paddingRight: Platform.OS == 'android' ? 0 : 30 }}
              />
            );
          },
          headerTitleAlign: 'center',
          headerRight: () => {
            return <LogOutBtn />;
          },
          tabBarIcon: () => {
            return <ProfileBtn />;
          },
          tabBarShowLabel: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Navigation;
