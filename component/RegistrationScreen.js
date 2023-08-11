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
import { AntDesign } from "@expo/vector-icons";
import User from "../assets/image/test.png";
import { useNavigation } from "@react-navigation/native";
// import { resetData } from "../../utils/dataStorage";
import { useDispatch } from "react-redux";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { register } from "../redux/auth/authOperations";
// import { storage } from "../firebase/config";
// import avatar from 'C:/GitHub/Home-Work/test/assets/img/Avatar/av-01.jpg'

// import { firebase } from "@react-native-firebase/storage";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [error, setError] = useState(null);

  const [time, setTime] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      setTime(5);
      setTimeout(() => {
        setTime(null);
      }, 5000);
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

  const validateName = (value) => {
    setLogin(value);
    const pattern = /^[a-zA-Z' -]+$/;
    if (pattern.test(value) === false) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };

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

  const submit = async () => {
    if (!isValidName) {
      setMessage("Not valid login");
      return;
    }
    if (!isValidEmail) {
      setMessage("Not valid email");
      return;
    }
    if (!isValidPassword) {
      setMessage("Not valid password");
      return;
    }
    const userData = {
      login,
      email,
      password,
    };
    try {
      // const avatarRef = await uploadAvatarToServer();

      setLogin('')
      setEmail('')
      setPassword('')
      setShow(false)
      setMessage('')
      setIsValidName(false)
      setIsValidEmail(false)
      setIsValidPassword(false)
      // resetData()

      dispatch(register({ ...userData,
        //  avatar: avatarRef ,
        }));     

      
    } catch (error) {
      console.log("Upload avatar to server error", error.message);
      
      setError(`Upload avatar to server error ${error.message}`);
    }
    // console.log(userData);

    // navigation.navigate("Home")
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.background} source={BackgroundImage}>
        <StatusBar style="auto" />

        <View
          style={{
            ...styles.main,
            height: keyboardVisible ? 330 : 500,
            paddingBottom: keyboardVisible ? 20 : 40,
          }}
        >
          <ImageBackground style={styles.photoWrapp} source={User}>
            <TouchableOpacity style={styles.plusBtn}>
              <AntDesign name="pluscircleo" size={25} style={[styles.plus]} />
            </TouchableOpacity>
          </ImageBackground>

          <Text
            style={{ ...styles.title, color: time ? "crimson" : "#212121" }}
          >
            {message && time ? "Wasted" : "Реєстрація"}
          </Text>

          <View style={styles.form}>
            <KeyboardAvoidingView
              style={styles.inputs}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                name="login"
                value={login}
                onChangeText={validateName}
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
              />
              <TextInput
                style={styles.input}
                name="email"
                value={email}
                onChangeText={validateEmail}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
              />
              <View style={styles.inputWrapp}>
                <TextInput
                  style={styles.input}
                  name="password"
                  value={password}
                  onChangeText={validatePassword}
                  placeholder="Пароль"
                  placeholderTextColor="#bdbdbd"
                  secureTextEntry={!show}
                />

                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={() => setShow(!show)}
                >
                  <Text style={styles.textShow}>
                    {show ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              {message ? (
                <Text style={styles.errorMessage}>{message}</Text>
              ) : null}
            </KeyboardAvoidingView>

            {!keyboardVisible && (
              <View style={styles.btnWrapp}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.alreadyHaveAccount}
                >
                  <Text style={styles.alreadyHaveAccountText}>
                    Вже є акаунт? Увійти
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.regBtn} onPress={submit}>
                  <Text style={styles.regBtn__text}>Зареєстуватися</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              ...styles.homeIndicator,
              backgroundColor: keyboardVisible ? "#fff0" : "#212121",
            }}
          ></View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

export const styles = StyleSheet.create({
  background: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",

    justifyContent: "flex-end",
  },

  main: {
    position: "relative",

    gap: 16,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
    width: "100%",
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  photoWrapp: {
    position: "absolute",
    top: -60,
    transform: [{ translateX: 4 }, { translateY: 0 }],

    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  plusBtn: {
    position: "absolute",
    top: 70,
    right: -10,
  },
  plus: {
    color: "#FF6C00",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  inputs: {
    gap: 16,
  },
  input: {
    width: 343,
    height: 50,
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    padding: 16,
    color: "#212121",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    textDecorationLine: "none",
  },

  errorMessage: {
    color: "crimson",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 800,
    marginHorizontal: 20,
  },
  alreadyHaveAccount: {
    padding: 2,
    textAlign: "center",
  },
  alreadyHaveAccountText: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    flex: 2,
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnWrapp: {
    flex: 1,
    flexDirection: "column-reverse",
    gap: 16,
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  regBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    width: 343,
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  regBtn__text: {
    color: "#eee",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
  inputWrapp: {
    position: "relative",
  },
  showPassword: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  textShow: {
    fontFamily: "Roboto",
    color: "#1B4371",
    fontSize: 16,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 10,
    width: 134,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#212121",
  },
  custom: {
    backgroundColor: "#ff2",
  },
});
