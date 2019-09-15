import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAHRUXdaAgPoyu-gHnpqQZ2wC4aZfkPDvo',
  authDomain: 'macro-dbe61.firebaseapp.com',
  databaseURL: 'https://macro-dbe61.firebaseio.com',
  projectId: 'macro-dbe61',
  storageBucket: 'macro-dbe61.appspot.com',
  messagingSenderId: '307615212931',
});

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase