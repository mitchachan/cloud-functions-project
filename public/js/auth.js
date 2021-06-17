const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const createForm = document.querySelector('.createRoom');
const joinForm = document.querySelector('.joinRoom');
const leave = document.querySelector('.leave');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active')) // only using one line w/o return val, so no curly
  });
});

// create form
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const screenName = createForm.screenName.value;

  console.log(screenName);
  
  firebase.auth().signInAnonymously()
    .then((user) => {
        console.log('authenticated', user);
        createForm.reset();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        createForm.querySelector('.error').textContent = errorMessage;
    });
});

// join room
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const screenName = joinForm.screenName.value;
  
    console.log(screenName);
    
    firebase.auth().signInAnonymously()
      .then((user) => {
          console.log('authenticated', user);
          joinForm.reset();
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          joinForm.querySelector('.error').textContent = errorMessage;
      });
});

// leave room 

leave.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => console.log('signed out'));
});
  
// authentication listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authWrapper.classList.remove('open'); // allows users to go to the website
      authModals.forEach(modal => modal.classList.remove('active')); // remove join/create room obstructions
    } else {
      authWrapper.classList.add('open');
      authModals[0].classList.add('active'); // makes first modal (join room form) visible
    }
});