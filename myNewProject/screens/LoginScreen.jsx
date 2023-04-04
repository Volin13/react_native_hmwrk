import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";

const initialState = {
  password: "",
  email: "",
};

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const [keyboardShown, setShownKeyboard] = useState(false);
  const { width } = useWindowDimensions();

  const keyboardHide = () => {
    setShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  const onLogin = () => {
    dispatch(logIn());
    console.log(`${state.email} + ${state.password}`);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/registrationBG.jpg")}
          style={styles.imageBG}
        >
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS == "android" ? "height " : "padding"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: keyboardShown ? 32 : 179,
                width,
              }}
            >
              <Text style={styles.title}>Login</Text>
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Email"
                secureTextEntry={true}
                style={styles.input}
                onFocus={() => setShownKeyboard(true)}
              />
              <TextInput
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onFocus={() => setShownKeyboard(true)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onLogin}
              >
                <Text style={styles.textBtn}>Login</Text>
              </TouchableOpacity>
              <View style={styles.btnBottom}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.textBtnBottom}>
                    Don't have an account? Register.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
  },
  title: {
    fontWeight: "500",
    fontFamily: "Roboto",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  btnBottom: {
    marginTop: 16,
  },

  textBtnBottom: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto",
  },
});

export default LoginScreen;
