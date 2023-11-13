function SearchResults(props) {
  return (
    <>
      <li className="movie-card">
        <img
          className="movie-card--img"
          src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}
          alt={`Poster of ${props.movie.title}`}
        />
        <div className="movie-card--text">
          <h3 className="movie-card--title">{props.movie.title}</h3>
          <p className="movie-card--overview">
            <span className="bold--text">Overview:</span> {props.movie.overview}
          </p>
          <p className="movie-card--release">
            <span className="bold--text">Release Date:</span>{" "}
            {props.movie.release_date}
          </p>
          <p className="movie-card--language">
            <span className="bold--text">Language:</span>{" "}
            {props.movie.original_language}
          </p>
        </div>
      </li>
      <hr />
    </>
  );
}

export default SearchResults;
