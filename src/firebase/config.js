import { initializeApp } from "firebase/app";import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getFirestore, serverTimestamp, collection} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm3viX5Q0PgysLCOyl90y1h3M2kMgryuw",
  authDomain: "roast-me-a6d67.firebaseapp.com",
  databaseURL: "https://roast-me-a6d67-default-rtdb.firebaseio.com",
  projectId: "roast-me-a6d67",
  storageBucket: "roast-me-a6d67.appspot.com",
  messagingSenderId: "330907648317",
  appId: "1:330907648317:web:b8590cb4dad53643f44554"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);
const timestamp = serverTimestamp(firebaseApp);

export {storage, ref, uploadBytes, getDownloadURL, firestore, timestamp, collection};
