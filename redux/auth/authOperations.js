import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Toast from "react-native-root-toast";
import { authSlice } from "./authReducer";

const {
  authSignOut,
  updateUserProfile,
  authStateChange,
  fetchingError,
  fetchingInProgress,
} = authSlice.actions;

export const register =
  ({ email, password, login, avatar }) =>
  async (dispatch) => {
    try {
      dispatch(fetchingInProgress());
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = response.user;

      Toast.show("You have successfully registered", {
        duration: 5000,
        position: 50,
      });

      await updateProfile(auth.currentUser, {
        displayName: login,
        userId: user.uid,
        photoURL: avatar,
      });

      const { displayName, uid, photoURL } = await auth.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      
    } catch (error) {
      console.log("error.message", error.message);
      dispatch(fetchingError(error.message));
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(fetchingInProgress());
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { displayName, uid, photoURL } = user.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));

      Toast.show(`Signed in!!`, {
        duration: 5000,
        position: 50,
      });
    } catch (error) {
      dispatch(fetchingError(error.message));
      console.log("error.message", error.message);
    }
  };

export const deleteAvatar = () => async (dispatch) => {
  try {
    dispatch(fetchingInProgress());

    await updateProfile(auth.currentUser, {
      displayName,
      userId: uid,
      photoURL: null,
    });

    const { displayName, uid, photoURL, email } =
      await auth.currentUser;

  

    const userUpdateProfile = {
      userName: displayName,
      userId: uid,
      userAvatar: null,
      userEmail: email,
    };

    dispatch(updateUserProfile(userUpdateProfile));

    Toast.show(`Avatar deleted!!`, {
      duration: 5000,
      position: 50,
    });
  } catch (error) {
    dispatch(fetchingError(error.message));
    console.log("error.message", error.message);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch(fetchingInProgress());
    await signOut(auth);
    dispatch(authSignOut());

    Toast.show("Account logged out!", {
      duration: 5000,
      position: 50,
    });
  } catch (error) {
    console.log("error", error);
    dispatch(fetchingError(error.message));
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userId: user.uid,
          userAvatar: user.photoURL,
          userEmail: user.email,
        };
        dispatch(fetchingInProgress());
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    dispatch(fetchingError(error.message));
    console.log("error", error.message);
  }
};