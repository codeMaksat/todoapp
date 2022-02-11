import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDIcQzFeHiiP595mgQlDAKxA5Icsqcw3Gs",
    authDomain: "todoapp-a1bed.firebaseapp.com",
    projectId: "todoapp-a1bed",
    storageBucket: "todoapp-a1bed.appspot.com",
    messagingSenderId: "191050388213",
    appId: "1:191050388213:web:5f877673712a1e79cbabbc",
    measurementId: "G-GMT2E9J94C"
}
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp.firestore()