const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');

var firebaseConfig = {
    apiKey: "AIzaSyCa8qOgJTRxLgB4Fe51Q_30Ul44TlNXMIU",
    authDomain: "cloud-functions-test-73879.firebaseapp.com",
    databaseURL: "https://cloud-functions-test-73879-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cloud-functions-test-73879",
    storageBucket: "cloud-functions-test-73879.appspot.com",
    messagingSenderId: "660903084866",
    appId: "1:660903084866:web:292974b03653c5cc5bfedb"
};

firebase.initializeApp(firebaseConfig);

// open request modal
requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});
  
// close request modal
requestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// say hello button call
const button = document.querySelector('.call');
button.addEventListener('click', () => {
  // get function reference
  const sayHello = firebase.functions().httpsCallable('sayHello');
  sayHello().then(result => {
    console.log(result.data);
  });
});