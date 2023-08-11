import { useSelector } from 'react-redux';

export const selectAuth = (state) => state.auth;
export const selectUserId = (state) => state.auth.userId;
export const selectUserName = (state) => state.auth.userName;
export const selectEmail = (state) => state.auth.userEmail;
export const selectAvatar = (state) => state.auth.userAvatar;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectStateChange = (state) => state.auth.stateChange;
export const selectError = (state) => state.auth.error;

export const getTheme =  state => state.theme.theme

export const useAuth = () => {

    return {

      auth: useSelector(selectAuth),
      userId: useSelector(selectUserId),
      login: useSelector(selectUserName),
      email: useSelector(selectEmail),
      avatar: useSelector(selectAvatar),
      isLoading: useSelector(selectIsLoading),
      stateChange: useSelector(selectStateChange),
      error: useSelector(selectError),
      
    };
  };