import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <LoginScreen /> */}
        <RegistrationScreen />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default App;
