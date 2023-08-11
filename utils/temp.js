// import { useRoute } from "@react-navigation/native"
import { useState } from "react"

{!photo 
    ? <Camera   ref={setsnap}
      style = {[postStyles.photoFrame, styles.camera, ]}>
      </Camera>
    : <Image source={photo}/>}
      <TouchableOpacity
            onPress={takePicture}
             style = {styles.cameraBtn}>
              <MaterialIcons name="photo-camera" size={24} color="#bdbdbd" />
            </TouchableOpacity>

const styles = StyleSheet.create({

    cameraBtn: {
        position: 'absolute',
        right: '50%',
        top: '25%',
        transform: [{ translateX: 30 },{ translateY: 30 }],
        width: 60,
        height: 60,
        backgroundColor: '#fff3',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



const temp = () => {
  return (
<View style={styles.card} key={item.id.toString()}>
<Image source={{uri: item.photo}}  style={styles.photoFrame} />
<Text style={styles.cardText}>Ліс</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Ivano-Frankivs'k Region, Ukraine</Text>
    </View>
</View>
</View> 
  )
}

const temp2 = () => {
  return (
    <View key={item.id.toString()}>
    <Image 
    source={{uri: item.photo}}
    style ={{marginBottom:100,}}
    />
  </View>
    )
  }



{/* <View style={styles.card}>
<ImageBackground style={styles.photoFrame} source={BgImage2}></ImageBackground>
<Text style={styles.cardText}>Захід на Чорному морі</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather 
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Odesa, Ukraine</Text>
    </View>
</View>
</View> */}
{/* 
<View style={styles.card}>
<ImageBackground style={styles.photoFrame} source={BgImage3}></ImageBackground>
<Text style={styles.cardText}>Старий будиночок у Венеції</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Venice, Italy</Text>
    </View>
</View>
</View> */}

useEffect(() => {
  (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");

      let locationUser =
          await Location.requestForegroundPermissionsAsync();
      if (locationUser.status !== "granted") {
          console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
      };
      setLocation(coords);
  })();
  return reset();
}, []);

const places = [{
  id: '01',
  naming: 'The City of Lights',
  location: 'Paris, France',
  photo: 'https://www.holidify.com/images/bgImages/PARIS.jpg'
},
{
  id: '02',
  naming: 'The Grand Canyon',
  location: 'USA',
  photo: 'https://www.holidify.com/images/cmsuploads/compressed/grand_20181214130027.jpg'
},
{
  id: '03',
  naming: 'The Land Where Adventures Wait',
  location: 'New Zealand',
  photo: 'https://holidify.com/images/bgImages/NEW-ZEALAND.jpg'
},
{
  id: '04',
  naming: ' The heritage of England',
  location: 'London, UK',
  photo: 'https://www.holidify.com/images/bgImages/LONDON.jpg'
},
{
  id: '05',
  naming: ' Great Barrier Reef ',
  location: 'Australia',
  photo: 'https://www.holidify.com/images/bgImages/GREAT-BARRIER-REEF.jpg'
},
]


const fort = () => {
return(
  <View style={postStyles.card}>
        <ImageBackground style={postStyles.photoFrame} source={BgImage1}></ImageBackground>
        <Text style={postStyles.cardText}>Ліс</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome 
             onPress={() => navigation.navigate("Comments")}
            style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <AntDesign name="like2" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={postStyles.cardLocation}>Ukraine</Text>
            <Feather
            onPress={() => navigation.navigate("Map")}
            name="map-pin" size={24} color="#bdbdbd" />
            </View>
        </View>
        </View> 



)
}
// private routes
const [isAuth, setIsAuth] = useState(false)

const useRoute =()=> {
  if(!isAuth){
    return (
      <Provider store={store }>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
      <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
      
    </Stack.Navigator>
    </Provider>
    )
  }
  else {
    return (
      <Provider store={store }>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
    </Stack.Navigator>
    </Provider>
    )
  }
}


  export default App =() =>{
const [isReady, setIsReady] = useState(false)
const [isLoading, setIsLoading] = useState(false)


const routing = useRoute(null)

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      console.log(user.email)
      setUser(user);
    } else {
      // User is signed out.
      setUser(null);
    }
  });

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
}, []);

if(isLoading){
  return(
    <AppLoading></AppLoading>
   )
}
else{
  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
  )
 {
  return (
    <Provider store={store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
          <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
          <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
      
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
  }
}


  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
     console.log('user->',user)
     setUser(user)
     dispatch(authSlice.actions.updateUserProfile({ 
         email: user.email,
         login: user.displayName,
         userId: user.uid,
     }))
 })
 
     }, []);

     //===========================
     const [posts, setPosts] = useState([])

     const getAllPosts = async () => {
   

      const q = query(collection(db, "posts"));

      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
     
        console.log(doc.id, " => ", doc.data());

      });

  }  


  useEffect(() => {
    getAllPosts();
  }, []);
  //===============================