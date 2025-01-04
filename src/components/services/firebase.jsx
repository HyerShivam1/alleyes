/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDocs,
  collection,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

// Configuration of the firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export const Firebase = getFirestore(firebaseApp);

const FirebaseContext = createContext(null);

export const useFireBase = () => useContext(FirebaseContext);

// Fetching the User
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const getUserUid = () => {
    return user?.uid;
  };

  // Fetching the products  and their details
  const GetData = async (product) => {
    try {
      const docRef = await getDocs(collection(Firebase, "product"), product);
      return docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };

  // Sending the order Data
  const sendOrderData = async (GetOrderAddress, GetCart) => {
    try {
      const orderId = uuidv4();
      const orderRef = doc(
        collection(Firebase, "orderData", user.uid, "orders"),
        orderId
      );
      await setDoc(orderRef, {
        orderId: orderId,
        address: GetOrderAddress,
        products: GetCart,
        createdAt: new Date().toISOString(),
      });
      console.log("Order Confirmed");
    } catch (error) {
      console.error("Error storing order data:", error);
    }
  };

  // Fetching the order Data
  const FetchOrderData = async (uid) => {
    if (!uid) {
      return null;
    }
    try {
      console.log(uid);

      const docRef = await getDocs(
        collection(Firebase, "orderData", uid, "orders")
      );
      return docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };

  // Sending data of the signup user
  const signupUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(Firebase, "users", user.uid), {
        email: email,
        uid: user.uid,
        displayName: displayName,
        password: password,
        createdAt: new Date().toISOString(),
      });

      console.log("User signed up and data saved successfully!");
    } catch (error) {
      console.error("Error signing up user: ", error);
    }
  };

  // Fetching the data of signin user
  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const isLoggedIn = user ? true : false;
  const signout = () => {
    return signOut(firebaseAuth);
  };

  const putData = (key, data) => set(ref(database, key), data);
  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signinUser,
        putData,
        isLoggedIn,
        signout,
        user,
        GetData,
        sendOrderData,
        FetchOrderData,
        getUserUid,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
