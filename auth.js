const firebaseConfig = {
    apiKey: "AIzaSyDWa1UbqDd3VRGyGWn77j7IvouJaM5tUGs",
    authDomain: "examready-7413e.firebaseapp.com",
    projectId: "examready-7413e",
    storageBucket: "examready-7413e.firebasestorage.app",
    messagingSenderId: "914100635877",
    appId: "1:914100635877:web:caa3b48e18c16bd7ddec0c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// REGISTER
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email,password)
      .then(userCredential => {
        db.collection('users').doc(userCredential.user.uid).set({
          name,
          email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Registration successful!');
        window.location.href = 'login.html';
      })
      .catch(error => alert(error.message));
  });
}

// LOGIN
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email,password)
      .then(() => window.location.href='subjects.html')
      .catch(error => alert(error.message));
  });
}

// REDIRECT LOGGED-IN USERS AWAY FROM LOGIN/REGISTER
auth.onAuthStateChanged(user => {
  if(user && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))){
    window.location.href='subjects.html';
  }
});