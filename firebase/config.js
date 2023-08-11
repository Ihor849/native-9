// import * as firebase  from "firebase";
import "firebase/auth";
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  
  apiKey: "AIzaSyB4AC_ElL6RZPyU8nsYEl6RFvphVaE0CSA",
  authDomain: "native-5-5b5d5.firebaseapp.com",
  projectId: "native-5-5b5d5",
  storageBucket: "native-5-5b5d5.appspot.com",
  messagingSenderId: "859084897948",
  appId: "1:859084897948:web:30894141e8c8f08eb2b759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
