import { useState } from "react";
import SearchResults from "./SearchResults";

function MovieSearch() {
  /* Managing state for search input and movies array */

  const [search, setSearch] = useState("");
  const [moviesArr, setMoviesArr] = useState([]);

  /* Async fetching of data from the TMDB API with try-catch */

  const searchMovieData = async (e) => {
    e.preventDefault();

    const baseUrl = "https://api.themoviedb.org/";
    const publicKey = "8bcce1feaef164eec72e92dae299e3a6";
    const url = `${baseUrl}3/search/movie?query=${search}&api_key=${publicKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMoviesArr(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  /* Handling event changes on the search input */

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="search-bar--container">
        <h1 className="search-bar--heading">Find a movie to watch</h1>
        <form className="search-bar--form">
          <label className="search-bar--label" htmlFor="search">
            Movie Name
          </label>
          <input
            className="search-bar--input"
            type="text"
            name="search"
            placeholder="i.e. Avengers Endgame"
            value={search}
            onChange={handleSearchInput}
            onKeyUp={searchMovieData}
          />
        </form>
      </section>
      <section className="search-results--container">
        <ul className="search-results--list">
          {moviesArr
            .filter(
              (movie) =>
                movie.poster_path && movie.overview && movie.release_date
            )
            .map((movie) => (
              <SearchResults key={movie.id} movie={movie} />
            ))}
        </ul>
      </section>
    </>
  );
}

export default MovieSearch;
