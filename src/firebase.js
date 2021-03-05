import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDxXvJemlxlF5_rzbn1Q9iojee--nLdSp0',
	authDomain: 'imessage-clone-yt-4bf2f.firebaseapp.com',
	projectId: 'imessage-clone-yt-4bf2f',
	storageBucket: 'imessage-clone-yt-4bf2f.appspot.com',
	messagingSenderId: '1028466186087',
	appId: '1:1028466186087:web:937dfefe1bef14562f81c2'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
