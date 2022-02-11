import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDIcQzFeHiiP595mgQlDAKxA5Icsqcw3Gs",
    authDomain: "todoapp-a1bed.firebaseapp.com",
    projectId: "todoapp-a1bed",
    storageBucket: "todoapp-a1bed.appspot.com",
    messagingSenderId: "191050388213",
    appId: "1:191050388213:web:5f877673712a1e79cbabbc",
    measurementId: "G-GMT2E9J94C"
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore