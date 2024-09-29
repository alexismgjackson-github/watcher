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

// === UI - Elements - LOGGED OUT VIEW (LOGIN) === ////

const viewLoggedOutLogin = document.getElementById("logged-out-view-login");
const userAuthContainer = document.getElementById("user-auth-container");
const loginEmailInput = document.getElementById("login-email-input");
const loginPasswordInput = document.getElementById("login-password-input");
const loginShowPasswordBtn = document.getElementById("login-show-password-btn");
const loginBtn = document.getElementById("login-btn");
const viewLoginAuthBtn = document.getElementById("view-login-auth-btn");

// === UI - Elements - LOGGED OUT VIEW (REGISTER) === ////

const viewLoggedOutRegister = document.getElementById(
  "logged-out-view-register"
);
const emailAuthContainer = document.getElementById("email-auth-container");
const passwordAuthContainer = document.getElementById(
  "password-auth-container"
);
const registerEmailInput = document.getElementById("register-email-input");
const registerPasswordInput = document.getElementById(
  "register-password-input"
);
const registerShowPasswordBtn = document.getElementById(
  "register-show-password-btn"
);
const signupBtn = document.getElementById("signup-btn");
const viewRegisterAuthBtn = document.getElementById("view-register-auth-btn");

// === UI - Elements - LOGGED IN VIEW (SEARCH) === ////

const viewLoggedIn = document.getElementById("logged-in-view");
const viewWatchlistBtn = document.getElementById("view-watchlist-btn");
const logoutBtn = document.getElementById("logout-btn");
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

const baseUrl = "https://api.themoviedb.org/";
const apiKey = "c073b993bfd587ff8250925f5296110a";

// === UI - Elements - LOGGED IN VIEW (WATCHLIST - MODAL) === ////

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");

// === UI - Event listeners - LOGGED OUT VIEW (LOGIN) === ////

loginBtn.addEventListener("click", authLogInWithEmail);

loginShowPasswordBtn.addEventListener("click", showLoginPassword);

viewRegisterAuthBtn.addEventListener("click", showRegistration);

// === UI - Event listeners - LOGGED OUT VIEW (REGISTER) === ////

signupBtn.addEventListener("click", authCreateAccWithEmail);

registerShowPasswordBtn.addEventListener("click", showRegisterPassword);

viewLoginAuthBtn.addEventListener("click", showLogin);

// === UI - Event listeners - LOGGED IN VIEW (SEARCH) === ////

logoutBtn.addEventListener("click", authSignOut);

viewWatchlistBtn.addEventListener("click", showWatchlistModal);

closeModalBtn.addEventListener("click", closeWatchlistModal);

searchBtn.addEventListener("click", fetchMovies);

// surpriseMeBtn.addEventListener("click", generateMovies);

// === UI - Event listeners - LOGGED IN VIEW (WATCHLIST - MODAL) === ////

closeModalBtn.addEventListener("click", closeWatchlistModal);

// === Main code === ////

onAuthStateChanged(auth, (user) => {
  if (user) {
    showCreateAccountSuccess();
    setTimeout(showLoggedInView, 1500);
  } else {
    setTimeout(showLoggedOutView, 500);
  }
});

// === Functions - Firebase === ////

function authLogInWithEmail() {
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      resetUserMessage();
      clearLoginAuthFields();
    })
    .catch((error) => {
      console.error(error.message);
      showUserError();
    });
}

function authCreateAccWithEmail() {
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      console.error(error.message);
      showCreateAccountError();
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      resetCreateAcccountMessages();
    })
    .catch((error) => {
      console.error(error.message);
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

function clearInputField(field) {
  field.value = "";
}

// === Functions - UI - LOGGED OUT VIEW (LOGIN) === ////

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showViewInGrid(viewLoggedOutLogin);
}

function showLogin() {
  resetCreateAcccountMessages();
  clearLoginAuthFields();
  hideView(viewLoggedOutRegister);
  showViewInGrid(viewLoggedOutLogin);
}

function resetUserMessage() {
  userAuthContainer.innerHTML = "";
}

function showUserError() {
  userAuthContainer.innerHTML = `
  <div class="user-error" id="user-error">
    <img
    src="assets/error.svg"
    alt="Red circle with exclamation point inside"
    />
    <p class="user-auth-message error">
      This email address does not exist and/or the password is incorrect.
    </p>
  </div>
  `;
}

function clearLoginAuthFields() {
  clearInputField(loginEmailInput);
  clearInputField(loginPasswordInput);
}

function showLoginPassword() {
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    loginShowPasswordBtn.style.opacity = 1;
  } else {
    loginPasswordInput.type = "password";
    loginShowPasswordBtn.style.opacity = 0.5;
  }
}

// === Functions - UI - LOGGED OUT VIEW (REGISTER) === ////

function showRegistration() {
  resetUserMessage();
  clearRegisterAuthFields();
  hideView(viewLoggedOutLogin);
  showViewInGrid(viewLoggedOutRegister);
}

function resetCreateAcccountMessages() {
  emailAuthContainer.innerHTML = "";
  passwordAuthContainer.innerHTML = "";
}

function showCreateAccountSuccess() {
  emailAuthContainer.innerHTML = `
  <div class="email-success" id="email-success">
    <img
    src="assets/success.svg"
    alt="Green circle with checkmark inside"
    />
    <p class="email-auth-message success">
      Great! Your email address was successfully created.
    </p>
  </div>`;

  passwordAuthContainer.innerHTML = `
  <div class="password-success" id="password-success">
    <img
    src="assets/success.svg"
    alt="Green circle with checkmark inside"
    />
    <p class="password-auth-message success">
      Great! Your password was successfully created.
    </p>
  </div>`;
}

function showCreateAccountError() {
  emailAuthContainer.innerHTML = `
  <div class="email-error" id="email-error">
    <img
    src="assets/error.svg"
    alt="Red circle with exclamation point inside"
    />
    <p class="email-auth-message error">
    Please enter a valid email address.
    </p>
  </div>`;

  passwordAuthContainer.innerHTML = `
  <div class="password-error" id="password-error">
    <img
    src="assets/error.svg"
    alt="Red circle with exclamation point inside"
    />
    <p class="password-auth-message error">
      Your password must contain 6 or more characters.
    </p>
  </div>`;
}

function clearRegisterAuthFields() {
  clearInputField(registerEmailInput);
  clearInputField(registerPasswordInput);
}

function showRegisterPassword() {
  if (registerPasswordInput.type === "password") {
    registerPasswordInput.type = "text";
    registerShowPasswordBtn.style.opacity = 1;
  } else {
    registerPasswordInput.type = "password";
    registerShowPasswordBtn.style.opacity = 0.5;
  }
}

// === Functions - UI - LOGGED IN VIEW (SEARCH) === ////

function showLoggedInView() {
  hideView(viewLoggedOutLogin);
  hideView(viewLoggedOutRegister);
  showViewInGrid(viewLoggedIn);
}

function fetchMovies(event) {
  event.preventDefault();
  console.log("fetching movies from database");
  searchMovieDatabase(searchBar.value);
}

async function searchMovieDatabase(inputValue) {
  const url = `${baseUrl}3/search/movie?query=${inputValue}&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const fetchedMoviesArray = data.results;

  /*
GENRE IDS
28  Action
12  Adventure
16  Animation
35  Comedy
80  Crime
99  Documentary
18  Drama
10751   Family
14  Fantasy
36  History
27  Horror
10402   Music
9648    Mystery
10749   Romance
878 Science Fiction
10770   TV Movie
53  Thriller
10752   War
37  Western
*/

  if (data.total_results > 0) {
    let html = "";
    console.log(fetchedMoviesArray);
    const filterFetchedMoviesArray = fetchedMoviesArray.filter(
      (movie) => movie.poster_path && movie.overview
    );
    for (let movie of filterFetchedMoviesArray) {
      html += `
  <div class="movie" id="movie">
    <div class="movie-primary">
      <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="movie-secondary">
        <h2 class="movie-heading">${movie.title}</h2>
        <p class="overview">${movie.overview}</p>
        <button class="search-watchlist-btn" id="${movie.id}">Add To Watchlist</button>
      </div>
    </div>
  </div>
  <hr>
      `;
    }
    searchResults.innerHTML = html;
    searchBar.value = "";
  } else {
    console.log("Zero results found");
    searchResults.innerHTML = `
    <p id="search-message" class="search-message">Unable to find what you are looking for. Please try again.</p>
    `;
  }
}

// === Functions - UI - LOGGED IN VIEW (WATCHLIST) === ////

function showWatchlistModal() {
  showViewInFlex(modal);
  document.body.style.overflow = "hidden";
}

function closeWatchlistModal() {
  hideView(modal);
  document.body.style.overflow = "scroll";
}
