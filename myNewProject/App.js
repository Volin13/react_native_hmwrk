import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';
import Operations from './components/Operations';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Operations>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </Operations>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default App;
