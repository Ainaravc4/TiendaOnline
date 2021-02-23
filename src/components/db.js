
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { firebaseConfig } from '../firebaseConfig.js'  


  /**STORAGE */

// Get a Firestore instance
export const db = firebase
.initializeApp(firebaseConfig)
.firestore()

export const storage = firebase.storage();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

export default {
  auth: firebase.auth(),
  //INICIAR SESION CON GOOGLE
  loginGoogle() {
    const google = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(google)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  logout() {
    firebase.auth().signOut()
    .then(function() {})
    .catch(function(error) {
      console.log(error)});
  },
  loginFacebook() {
    const facebook = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebook)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  loginGithub(){
    var github = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(github)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  //INICIAR SESION CORREO Y CONTRASEÑA
  signInWithEmailPassword(correo, contra) {
    firebase.auth().signInWithEmailAndPassword(correo, contra)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  },
  //REGISTRARSE CON CORREO Y CONTRASEÑA
  signUpWithEmailPasswoerd(correo, contra) {
    firebase.auth().createUserWithEmailAndPassword(correo, contra)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}