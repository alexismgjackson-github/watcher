// === Imports === ////

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// === Firebase setup === ////

const firebaseConfig = {
  apiKey: "AIzaSyD3oXhhIntMetNecqI5f5NwOIz5BKD7dOw",
  authDomain: "watcher-d12f5.firebaseapp.com",
  projectId: "watcher-d12f5",
  storageBucket: "watcher-d12f5.appspot.com",
}; // Firebase configuration

const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app); // Get a reference to the service

// === UI === ////

// === UI - Elements - LOGGED OUT VIEW (LOGIN/REGISTER) === ////

const viewLoggedOutLogin = document.getElementById("logged-out-view-login");
const viewLoggedOutRegister = document.getElementById(
  "logged-out-view-register"
);

const loginEmailInput = document.getElementById("login-email-input");
const loginPasswordInput = document.getElementById("login-password-input");
const registerEmailInput = document.getElementById("register-email-input");
const registerPasswordInput = document.getElementById(
  "register-password-input"
);

const loginShowPasswordBtn = document.getElementById("login-show-password-btn");
const registerShowPasswordBtn = document.getElementById(
  "register-show-password-btn"
);
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const viewRegisterAuthBtn = document.getElementById("view-register-auth-btn");
const viewLoginAuthBtn = document.getElementById("view-login-auth-btn");

const emailSuccess = document.getElementById("email-success");
const emailError = document.getElementById("email-error");
const passwordSuccess = document.getElementById("password-success");
const passwordError = document.getElementById("password-error");
const userError = document.getElementById("user-error");

// === UI - Elements - LOGGED IN VIEW (SEARCH) === ////

const viewLoggedIn = document.getElementById("logged-in-view");
const logoutBtn = document.getElementById("logout-btn");

// const searchBar = document.getElementById("search-bar");
// const searchBtn = document.getElementById("search-btn");
// const surpriseMeBtn = document.getElementById("surprise-me-btn");
// const searchResults = document.getElementById("search-results");

// === UI - Elements - LOGGED IN VIEW (WATCHLIST) === ////

// === UI - Event listeners === ////

loginBtn.addEventListener("click", authLogInWithEmail);

signupBtn.addEventListener("click", authCreateAccWithEmail);

registerShowPasswordBtn.addEventListener("click", showRegisterPassword);

loginShowPasswordBtn.addEventListener("click", showLoginPassword);

logoutBtn.addEventListener("click", authSignOut);

viewRegisterAuthBtn.addEventListener("click", showRegistration);

viewLoginAuthBtn.addEventListener("click", showLogin);

// === Main code === ////

showLoggedOutView();

// === Functions - Firebase === ////

function authStateChanged() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setTimeout(showLoggedInView, 1000);
    } else {
      setTimeout(showLoggedOutView, 1000);
    }
  });
}

function authLogInWithEmail() {
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      resetUserMessage();
      // console.log("Email address and/or password succeeded!");
      authStateChanged();
      // console.log("User is logged in!");
    })
    .catch((error) => {
      console.error(error.message);
      showUserError();
      // console.log("Email address and/or password failed!");
    });
}

function authCreateAccWithEmail() {
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      resetUserMessage();
      showCreateAccountSuccess();
      // console.log("Account created successfully!");
    })
    .catch((error) => {
      console.error(error.message);
      resetUserMessage();
      showCreateAccountError();
      // console.log("Account creation failed!");
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      // console.log("User is logging out");
      authStateChanged();
      clearLoginAuthFields();
      // console.log("User is logged out!");
    })
    .catch((error) => {
      console.error(error.message);
      // console.log("User failed to log out!");
    });
}

// === Functions - UI === ////

function showViewInFlex(view) {
  view.style.display = "flex";
}

function showViewInGrid(view) {
  view.style.display = "grid";
}

function hideView(view) {
  view.style.display = "none";
}

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showViewInGrid(viewLoggedOutLogin);
}

function showLoggedInView() {
  hideView(viewLoggedOutLogin);
  showViewInGrid(viewLoggedIn);
}

function showRegistration() {
  resetUserMessage();
  clearRegisterAuthFields();
  hideView(viewLoggedOutLogin);
  showViewInGrid(viewLoggedOutRegister);
}

function showLogin() {
  resetCreateAcccountMessages();
  clearLoginAuthFields();
  hideView(viewLoggedOutRegister);
  showViewInGrid(viewLoggedOutLogin);
}

function resetUserMessage() {
  hideView(userError);
}

function showUserError() {
  showViewInFlex(userError);
}

function resetCreateAcccountMessages() {
  hideView(emailError);
  hideView(emailSuccess);
  hideView(passwordError);
  hideView(passwordSuccess);
}

function showCreateAccountSuccess() {
  hideView(emailError);
  hideView(passwordError);
  showViewInFlex(emailSuccess);
  showViewInFlex(passwordSuccess);
}

function showCreateAccountError() {
  hideView(emailSuccess);
  hideView(passwordSuccess);
  showViewInFlex(emailError);
  showViewInFlex(passwordError);
}

function clearInputField(field) {
  field.value = "";
}

function clearLoginAuthFields() {
  clearInputField(loginEmailInput);
  clearInputField(loginPasswordInput);
}

function clearRegisterAuthFields() {
  clearInputField(registerEmailInput);
  clearInputField(registerPasswordInput);
}

function showLoginPassword() {
  // console.log("Toggle password visibility");
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    loginShowPasswordBtn.style.opacity = 1;
  } else {
    loginPasswordInput.type = "password";
    loginShowPasswordBtn.style.opacity = 0.5;
  }
}

function showRegisterPassword() {
  // console.log("Toggle password visibility");
  if (registerPasswordInput.type === "password") {
    registerPasswordInput.type = "text";
    registerShowPasswordBtn.style.opacity = 1;
  } else {
    registerPasswordInput.type = "password";
    registerShowPasswordBtn.style.opacity = 0.5;
  }
}
