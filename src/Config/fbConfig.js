import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyA7DtJZXmFd6S3aenF-MHK0fsaht3wZ5cc',
  authDomain: 'evernote-clone-21b98.firebaseapp.com',
  databaseURL: 'https://evernote-clone-21b98.firebaseio.com',
  projectId: 'evernote-clone-21b98',
  storageBucket: 'evernote-clone-21b98.appspot.com',
  messagingSenderId: '219291636310',
  appId: '1:219291636310:web:3fd75504cdcbfd30'
})

firebase.firestore().settings({})

export default firebase
