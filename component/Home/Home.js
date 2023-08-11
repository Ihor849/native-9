import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../PostsScreen/PostsScreen"
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";



export default function Home() {

    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
           <Tabs.Screen name="Posts" options={{headerShown: false,   tabBarStyle: { display: "none" },}} component={PostsScreen} />
           <Tabs.Screen name="CreatePost" options={{headerShown: false, tabBarStyle: { display: "none" },}} component={CreatePostsScreen} /> 
           <Tabs.Screen name="Profile" options={{headerShown: false, tabBarStyle: { display: "none" },}} component={ProfileScreen} /> 
           <Tabs.Screen name="Comments" options={{headerShown: false, tabBarStyle: { display: "none" },}} component={CommentsScreen} />
           <Tabs.Screen name="Map" options={{headerShown: false, tabBarStyle: { display: "none" },}} component={MapScreen} />
         
          
        </Tabs.Navigator>
    )
}