import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Navigation />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default App;
