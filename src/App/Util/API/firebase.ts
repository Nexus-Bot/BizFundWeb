import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyB0DlYc89XcB_dJqghZCOxm-oFL-hXteDg",
    authDomain: "bizfund.firebaseapp.com",
    projectId: "bizfund",
    storageBucket: "bizfund.appspot.com",
    messagingSenderId: "1087537382238",
    appId: "1:1087537382238:web:84dc42136e1c04a5a885cf",
    measurementId: "G-HGSMS3HX8Z",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const fireabaseStorage = getStorage(firebaseApp);

export default firebaseApp;
