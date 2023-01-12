import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchMoviesHandler() {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films");

    const data = await response.json();

    const movieObj = data.results.map((movie) => {
      return {
        episodeId: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      };
    });
    setMovies(movieObj);
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && movies.length === 0 && <p>Loading.....</p>}
        {!isLoading && movies.length === 0 && <p>No movie is loaded.</p>}
        {!isLoading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
