import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import {  logOut } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { collection,  onSnapshot, query} from "firebase/firestore";

import { styles as regStyles } from "../RegistrationScreen";

import User from "../../assets/image/test.png";
import { useNavigation } from "@react-navigation/native";
import { getData, resetData} from "../../utils/dataStorage";
import { useAuth } from "../../redux/auth/authSelectors";
import { useDispatch} from "react-redux";



const PostsScreen = ({route}) => {
  const [posts, setPosts] = useState([])
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { email, login } = useAuth();


  const getAllPosts = async () => {


    try {
      const dbRef = collection(db, "posts");
      const searchQuery = query(dbRef);
      onSnapshot(searchQuery, (docSnap) =>
        setPosts(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
  
    } catch (error) {
      console.log('Error fetching comments:', error);
     
    }
  }
  useEffect(() => {
    getAllPosts();
  }, [route.params]);
  
  return (
    <View
      style={[
        regStyles.background,
        styles.background,
      ]}
    >
      <StatusBar style="auto" />

      <View style={[styles.postsScreen]}>
        <View style={styles.titleWrapp}>
          <Text
          onPress={getData}
            style={[styles.title]}
          >
            Публікації
          </Text>
          
          <TouchableOpacity
            onPress={()=> {
              resetData()
              dispatch(logOut())}}
            style={styles.trayArrowBtn}
            
          >
            <MaterialCommunityIcons
              style={styles.trayArrow}
              name="tray-arrow-up"
              size={24}
            />
          </TouchableOpacity>
        </View>
        
        <View
          style={[styles.main]}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.user}>
            <View style={styles.imgContainer}>
              <Image style={styles.userAvatar} source={User} />
            </View>
            <View style={styles.userWrapp}>
              <Text style={[styles.userName]}>
              {login}
              </Text>
              <Text style={[styles.userEmail]}>
              {email}
              </Text>
            </View>
          </View>
          {posts &&
        <FlatList style ={{marginBottom:260,}}
          data={posts} keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (

        <View style={styles.card}  key={item.id}>
        <Image source={{uri: item.photo}}  style={styles.photoFrame} />
        <Text style={[styles.cardText]}>{item.postName}</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5
              onPress={() => navigation.navigate("Comments", {
              postId: item.id,
              photo: item.photo, })}
              style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={[styles.cardComment]}>{item.comments}</Text>
            </View>

        <View style={styles.flexWrapp}>
        <Feather
          onPress={() => navigation.navigate("Map",{item})}
          name="map-pin" size={24} color="#bdbdbd" />
        <Text style={[styles.cardLocation]}>{item.placeName}</Text>
        </View>
        </View>
        </View> 

        )} /> }
        </View>

        <View style={[styles.footer]}>
          <TouchableOpacity style={[styles.icon]}>
            
            <Feather style={styles.icon} name="grid" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate("CreatePost")}
          style={styles.addBtn}>
            <AntDesign name="plus" size={14} color="#eee" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
           style={styles.icon}>
            <Feather style={styles.icon} name="user" size={24} />
          </TouchableOpacity>

          <View style={regStyles.homeIndicator}></View>
        </View>
      </View>
    </View>
  );
};
export default PostsScreen;

export const styles = StyleSheet.create({
  background: {
    paddingTop: 32,
    
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  postsScreen: {
    flex: 1,
    gap: 32,
  },
  main: {


    flexDirection: "column",
    gap: 22,

    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
  },
  titleWrapp: {
    position: "relative",
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
    borderBottomStyle: "solid",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 17,
    fontWeight: 500,
    textAlign: "center",
  },
  switch: {
    position: "absolute",
    right: 50,
    bottom: 5,
    
  },
  themeBtn: {
    position: "absolute",
    left: 25,
    
  },
  themeIcon: {
  
    color: "#212121",
  },
  trayArrowBtn: {
    position: "absolute",
    right: 25,
   
  },
  trayArrow: {
    transform: [{ rotate: "90deg" }],
    color: "#bdbdbd",
  },
  user: {
    height: 60,
    width: 343,
    flexDirection: "row",
    
    gap: 12,
  },
  userWrapp: {
    height: 60,
    justifyContent: "center",
  },

  userName: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: 600,
  },
  userEmail: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 13,
  },
  card: {
    flex: 1,

    marginBottom: 22,
    flexDirection: "column",
    gap: 8,
  },
  photoFrame: {
    width: 343,
    height: 240,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
  },
  cardDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexWrapp: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  iconComment: {
    transform: [{ scaleX: -1 }],
  },
  cardComment: {
    color: "#bdbdbd",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
  },
  cardLocation: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  userAvatar: {
    width: 60,
    height: 60,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    height: 83,
    paddingTop: 8,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#777",
    borderTopStyle: "solid",
    width: "100%",
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    gap: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    width: 70,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
