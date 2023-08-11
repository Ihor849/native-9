import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./Main/Main";




export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/Fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/Fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/Fonts/Roboto-Bold.ttf"),
});

if (!fontsLoaded) {
    return null;
}

return (
    <Provider store={store }>
        <Main/>
    </Provider>
)
}
