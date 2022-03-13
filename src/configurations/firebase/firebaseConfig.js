import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


// nimeshdwejerathna2020@gmail.com
const firebaseConfig = {
      apiKey: "AIzaSyC6XxL6xd9hEeFzBH_tlgAbyWbbC9sjUrA",
      authDomain: "xchange-chat.firebaseapp.com",
      projectId: "xchange-chat",
      storageBucket: "xchange-chat.appspot.com",
      messagingSenderId: "159589851717",
      appId: "1:159589851717:web:6c1347b774f5a2af0b392c"
};

// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export {firebase, auth, database, firestore, messaging}
