import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MoviesList";

function AppWithAxios() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataChange, setDataChange] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://sending-http-request-f0115-default-rtdb.firebaseio.com/movies.json"
      );
      const data = await response.data;
      console.log(data);
      let movieList = [];
      for (const id in data) {
        const movie = {
          key: id,
          title: data[id].title,
          releaseDate: data[id].releaseDate,
          openingText: data[id].openingText,
        };
        movieList.push(movie);
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
    const response = await axios.post(
      "https://sending-http-request-f0115-default-rtdb.firebaseio.com/movies.json",
      {
        // By default axios uses Json for posting data so you don't need to stringify your data.
        title: movie.title,
        releaseDate: movie.releaseDate,
        openingText: movie.openingText,
      }
    );
    const data = await response;
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

export default AppWithAxios;
