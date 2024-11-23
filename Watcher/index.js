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
};

const app = initializeApp(firebaseConfig); // initialize firebase
const auth = getAuth(app); // get a reference to the authentication service

// console.log(firebaseConfig.databaseURL);

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
let watchlist = [];

// === UI - Elements - LOGGED IN VIEW (WATCHLIST - MODAL) === ////

let watchlistContainer = document.getElementById("watchlist-container");
let watchlistArray = JSON.parse(localStorage.getItem("watchlist")); // LOCALSTORAGE
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

searchBtn.addEventListener("click", handleClickSearch);

searchResults.addEventListener("dblclick", addMovieToWatchlist);

// === UI - Event listeners - LOGGED IN VIEW (WATCHLIST - MODAL) === ////

watchlistContainer.addEventListener("dblclick", deleteMovieFromWatchlist);

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

if (watchlistArray) {
  watchlist = watchlistArray;
  renderMoviesHtmlInWatchlist(watchlistArray); // LOCALSTORAGE
}

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
      searchResults.innerHTML = "";
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
      Log-in credentials are invalid. Please try again.
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
      Password must contain 6 or more characters.
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

function handleClickSearch(event) {
  event.preventDefault();
  // console.log("search button clicked!");
  fetchMovies(searchBar.value);
}

function fetchMovies(inputValue) {
  fetch(`${baseUrl}3/search/movie?query=${inputValue}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const fetchedMovies = data.results;
      const filteredFetchedMovies = fetchedMovies.filter(
        (movie) => movie.poster_path && movie.overview && movie.overview
      );
      // console.log(filteredFetchedMovies);
      if (data.total_results > 0) {
        renderFetchedMoviesHtml(filteredFetchedMovies);
      } else {
        // console.log("Zero results found");
        searchResults.innerHTML = `
    <p id="search-message" class="search-message">Unable to find what you are looking for. Please try again.</p>
    `;
      }
    });
}

function renderFetchedMoviesHtml(searchResultsArr) {
  let html = "";
  for (let movie of searchResultsArr) {
    html += `
  <div class="movie" id="movie">
    <div class="movie-primary">
      <img 
        class="movie-poster"
        src="https://image.tmdb.org/t/p/original/${movie.poster_path}" 
        alt="${movie.title} poster">
    </div>
    <div class="movie-secondary">
      <h2 class="movie-heading">${movie.title}</h2>
      <p class="overview">${movie.overview}</p>
      <div class="movie-btn-container">
        <button class="add-to-watchlist-btn"
          id="${movie.id}"
          data-id="${movie.id}" 
          data-poster="${movie.poster_path}" 
          data-title="${movie.title}"
          data-overview="${movie.overview}"
          >
            <img
                class="add-to-watchlist-icon"
                src="assets/add.svg"
                alt="Add To Watchlist"
            >
            Watchlist
        </button>
      </div>
    </div>
  </div>
  <hr>
      `;
  }

  searchResults.innerHTML = html;
  searchBar.value = "";
  // console.log(array);
}

function addMovieToWatchlist(event) {
  if (event.target.dataset.id) {
    let dataAttribute = event.target.dataset;
    const dataObject = {
      id: dataAttribute.id,
      poster: dataAttribute.poster,
      title: dataAttribute.title,
      overview: dataAttribute.overview,
    };

    console.log("Movie added to watchlist");
    alert("Movie added to watchlist");

    localStorage.setItem("watchlist", JSON.stringify(watchlist)); // LOCAL STORAGE
    renderMoviesHtmlInWatchlist(watchlist);

    console.log(watchlistArray); // null
    console.log(watchlist);
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

function renderMoviesHtmlInWatchlist(watchlistArr) {
  let watchlistHtml = "";

  for (let movie of watchlistArr) {
    watchlistHtml += `
    <li class="watchlist-movie-container" id="watchlist-movie-container">
      <div class="watchlist-movie" id="watchlist-movie"> 
        <div class="watchlist-movie-primary">
          <img 
          class="watchlist-movie-poster"
          src="https://image.tmdb.org/t/p/original/${movie.poster}"
          alt="${movie.title} poster">
        </div>
        <div class="watchlist-movie-secondary">
          <h2 class="watchlist-movie-heading">${movie.title}</h2>
          <p class="watchlist-overview">${movie.overview}</p>
          <div class="watchlist-btn-container">
            <button class="delete-from-watchlist-btn"
              id="${movie.id}" 
              data-id="${movie.id}">
              <img
                class="delete-from-watchlist-icon"
                src="assets/delete.svg"
                alt="Delete From Watchlist"
              />
              Watchlist
            </button>
          </div>
        </div>
      </div>
    </li>
  <hr> 
      `;
  }
  watchlistContainer.innerHTML = watchlistHtml;
  console.log(watchlistArr); //
}

function deleteMovieFromWatchlist(event) {
  let newWatchlist = [];

  if (event.target.dataset.id) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === event.target.dataset.id) {
        for (let j = 0; j < watchlist.length; j++) {
          if (i != j) {
            newWatchlist.push(watchlist[j]);
          }
        }
      }
    }

    console.log("Movie removed from watchlist");
    alert("Movie removed from watchlist");

    watchlistArray = newWatchlist;
    watchlist = newWatchlist;

    localStorage.setItem("watchlist", JSON.stringify(watchlist)); // LOCALSTORAGE
    renderMoviesHtmlInWatchlist(watchlist);
  }

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `<li><p class="watchlist-status">No movies found yet</p></li>`;
  }

  console.log(watchlistArray);
  console.log(watchlist); //
}
