import * as firebase from 'firebase';

// Firebase desarrollo
const config = {
  apiKey: 'AIzaSyA1gmVf0Pn_NuVjibLJszW0aTfvRokYxcs',
  authDomain: 'gigbox-ab7a4.firebaseapp.com',
  databaseURL: 'https://gigbox-ab7a4.firebaseio.com',
  storageBucket: '',
  projectId: "gigbox-ab7a4",
  messagingSenderId: '966444478090',
};

// Firebase de pruebas
// const config = {
//   apiKey: 'AIzaSyBX57H4HjlHsIsMtXb4TjIVnKAEG41HjMU',
//   authDomain: 'platzimusic-1bf81.firebaseapp.com',
//   databaseURL: 'https://platzimusic-1bf81.firebaseio.com',
//   storageBucket: '',
//   projectId: 'platzimusic-1bf81',
//   messagingSenderId: '354968721068',
// };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database();

export default firebase;
