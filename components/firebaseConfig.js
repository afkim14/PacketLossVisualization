// Initialize Firebase

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA0_LcD_f0wae_lF-emmi6T2QWsIP9i3PY",
  authDomain: "packetlossvisualization.firebaseapp.com",
  databaseURL: "https://packetlossvisualization.firebaseio.com",
  projectId: "packetlossvisualization",
  storageBucket: "packetlossvisualization.appspot.com",
  messagingSenderId: "812320126389",
  appId: "1:812320126389:web:7bc6281e10117900"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
