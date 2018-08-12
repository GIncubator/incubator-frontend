import firebase from 'firebase'
import Config from './../../config'

// Initialize Firebase
const config = Config.FireBase
firebase.initializeApp(config)
const auth = firebase.auth()
window.auth = auth;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()

const database = firebase.database()
export {
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
}
