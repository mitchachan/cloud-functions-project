const functions = require("firebase-functions");
const admin = require('firebase-admin');

var firebaseConfig = {
  apiKey: "AIzaSyCa8qOgJTRxLgB4Fe51Q_30Ul44TlNXMIU",
  authDomain: "cloud-functions-test-73879.firebaseapp.com",
  databaseURL: "https://cloud-functions-test-73879-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cloud-functions-test-73879",
  storageBucket: "cloud-functions-test-73879.appspot.com",
  messagingSenderId: "660903084866",
  appId: "1:660903084866:web:292974b03653c5cc5bfedb"
};

// firebase.initializeApp(firebaseConfig);
admin.initializeApp();

var room_database = admin.database().ref('rooms/ABCD/players');

// authentication trigger (new user enters/create room)

exports.newUserAdded = functions.auth.user().onCreate((user) => {
  console.log('user created', user.uid, user.displayName);
  const userUID = user.uid;
  return room_database.set({
    PlayerUID: userUID
  });
});

// Auth trigger (delete user when leaves room/disconnect from web app)

exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log('user deleted', user.uid, user.displayName);
});

// http request 1

exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
});

// http request 2

exports.toTheDojo = functions.https.onRequest((request, response) => {
  response.redirect("https://www.thenetninja.co.uk");
});

// http callable function

exports.sayHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `hello, ${name}`;
});
