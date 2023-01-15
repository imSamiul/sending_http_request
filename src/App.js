import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataChange, setDataChange] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://sending-http-request-f0115-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      let movieList = [];
      for (const id in data) {
        const movie = {
          key: id,
          title: data[id].title,
          releaseDate: data[id].releaseDate,
          openingText: data[id].openingText,
        };
        movieList.push(movie);

        // console.log(data);
      }
      setMovies(movieList);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setDataChange(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [dataChange, fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://sending-http-request-f0115-default-rtdb.firebaseio.com/movies.json",
      {
        method: "post",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setDataChange(true);
    console.log(data);
  }

  let content = <p>No movie is loaded.</p>;
  if (isLoading && movies.length === 0) {
    content = <p>Loading.....</p>;
  }
  if (!isLoading && movies.length === 0) {
    content = <p>No movie is loaded.</p>;
  }
  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (!isLoading && error) {
    content = (
      <div>
        <p>No movie is loaded.</p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
