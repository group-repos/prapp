const firebase = require('firebase');

let { REACT_APP_FBASE_AUTH_DOMAIN, REACT_APP_FBASE_WEB_API_KEY } = process.env;

var config = {
    apiKey: REACT_APP_FBASE_WEB_API_KEY,
    authDomain: REACT_APP_FBASE_AUTH_DOMAIN
}

firebase.initializeApp(config);
firebase.auth().useDeviceLanguage();



module.exports = {
    auth: firebase.auth(),
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

