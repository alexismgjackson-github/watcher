# _WATCHER - MOVIE WATCHLIST APP_

Watcher is a fully responsive app allows that the user to search for movies and create their own watch list.

## FEATURES

- Firebase Authentication
- Firebase Firestore
- Movie Searchbar
- Movie Watchlist Modal

## TECHNOLOGIES

- HTML
- CSS
- Javascript
- The Movie Database API
- Firebase
- Coolors Color Tool
- Google Fonts & Icons

## WHY I BUILT THIS

This is the first project I have built as a Frontend Developer. It was inspired by the Scrimba's Movie Watchlist solo project. The original assignment was to build a simple Movie Search app using Javascript and the Open Movie Database API. I decided to level up the project by overhauling the UI design. I paired this project with learning Firebase and opted to using The Movie Database API because I use TMDB when researching movies and I like their documentation more.

## WHAT I LEARNED

### _FIREBASE AUHTENTICATION_

- Understanding the basics of authentication in web apps
- Setting up Firebase in a web app for managing authentication
- Implementing user registration using email and password in a secure manner
- Enabling users to log in with their email and password and handling authentication forms and errors
- Developing the functionality to allow users to log out of the app

### _FIREBASE FIRESTORE_

- Understanding the basics of Cloud Firestore in managing app data
- Setting up Cloud Firestore and configuring it for use alongside Firebase Authenticaton
- Creating security rules to restrict read and write access to authenticated users
- Adding object datatypes via setDoc
- Removing object datatypes via deleteDoc
- Updating in the app via onSnapshot

### _FETCHING DATA_

- Understanding TMDB API documentation such as query parameters and response format
- Fetching data from TMDB API, handling the response and errors
- Filtering undesired search results (such as explicit movie content)

### _RESPONSIVE WEB DESIGN_

- Implementing media queries to add device breakpoints
- Using device breakpoints to change orientation, font size, etc
- Using CSS Position, Grid and Flexbox

### _ACCESSIBILITY_

- Calculating the contrast ratio of text, icons and background colors using Coolors' Color Contrast Checker
- Adding aria-labels and alt tags to buttons, icons, images, etc

## MOST CHALLENGING

- Displaying the genres - the data response from TMDB API only gave the genre IDS (numbers) but not the matching genre name (text). I ended up finding that information on TMDB's API Support and Stackoverflow and displayed the genres using Switch Statements.

## BUGS

- I have not been able to resolve the issue of the genres only displaying in the search results and not in the watchlist
- I have to use location.reload() to force the app to update with the changes made to the database

## FUTURE UPDATES

- Solve existing bugs
- Convert app from JavaScript to React and React Router
- Add filtering of movies via genres in the watchlist
- Toggle completed of movies in the watchlist
