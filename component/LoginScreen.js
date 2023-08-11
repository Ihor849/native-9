import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BackgroundImage from "../assets/image/BackgroundImage.png";
import { styles as regStyles } from "./RegistrationScreen";
import { useNavigation } from "@react-navigation/native";

import { signIn } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [time, setTime] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch()
 

  useEffect(() => {
    if (message) {
      setTime(4);
      setTimeout(() => {
        setTime(null);
      }, 4000);
    }
  }, [message]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateEmail = (value) => {
    setEmail(value);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(value) === false) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    const pattern = /^.{6,}$/;
    if (pattern.test(value) === false) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const submit = () => {
    if (!isValidEmail) {
      setMessage("Not valid email");
      return;
    }
    if (!isValidPassword) {
      setMessage("Not valid password");
      return;
    }

    const userData = {
      email,
      password,
    };

    setEmail("");
    setPassword("");
    setShow(false);
    setMessage("");
    setIsValidEmail(false);
    setIsValidPassword(false);

    dispatch(signIn(userData));
  
    // console.log(userData);
    // navigation.navigate("Home")
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={[regStyles.background, styles.background]}
        source={BackgroundImage}
      >
        <StatusBar style="auto" />

        <View
          style={{
            ...regStyles.main,
            ...styles.main,
            height: keyboardVisible ? 330 : 440,
            paddingTop: keyboardVisible ? 20 : 60,
            paddingBottom: keyboardVisible ? 8 : 60,
          }}
        >
          <Text 
          // onPress={()=> navigation.navigate("CreatePost")}
            style={{ ...regStyles.title, color: time ? "crimson" : "#212121" }}
          >
            {message && time ? "Wasted" : "Увійти"}
          </Text>

          <View style={regStyles.form}>
            <KeyboardAvoidingView
              style={regStyles.inputs}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={regStyles.input}
                name="email"
                value={email}
                onChangeText={validateEmail}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
              />
              <View style={regStyles.inputWrapp}>
                <TextInput
                  style={regStyles.input}
                  name="password"
                  value={password}
                  onChangeText={validatePassword}
                  placeholder="Пароль"
                  placeholderTextColor="#bdbdbd"
                  secureTextEntry={!show}
                />
                <TouchableOpacity
                  style={regStyles.showPassword}
                  onPress={() => setShow(!show)}
                >
                  <Text style={regStyles.textShow}>
                    {show ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              {message ? (
                <Text style={regStyles.errorMessage}>{message}</Text>
              ) : null}
            </KeyboardAvoidingView>

            <View style={regStyles.btnWrapp}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
                style={regStyles.alreadyHaveAccount}
              >
                <Text style={regStyles.alreadyHaveAccountText}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={regStyles.regBtn} onPress={submit}>
                <Text style={regStyles.regBtn__text}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              ...regStyles.homeIndicator,
              backgroundColor: keyboardVisible ? "#fff0" : "#212121",
            }}
          ></View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

export const styles = StyleSheet.create({
  background: {},
  main: {},
});
