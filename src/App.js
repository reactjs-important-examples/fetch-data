import React, { useState } from 'react';

import MovieList from './Components/MovieList';
import './App.css';

function App() {
  const[movies , setMovies] = useState([]);
  const[isLoading , setIsLoading] = useState(false);

  // ravesh aval
  // const fetchMoviesHandler = event =>{
  //   fetch('https://swapi.dev/api/films/')
  //   .then(response => response.json())
  //   .then(data => {
  //     const transformeMovies = data.results.map(result => 
  //       {return{
  //         id: result.episode_id,
  //         title: result.title,
  //         openingText: result.opening_crawl,
  //         releaseDate: result.release_date
  //       }}
  //     );
  //     setMovies(transformeMovies);
  //   })
  // }

  //ravesh dovom
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();

    const transformeMovies = data.results.map(result => {
      return{
        id: result.episode_id,
        title: result.title,
        openingText: result.opening_crawl,
        releaseDate: result.release_date
      }}
    );
    setMovies(transformeMovies);
    setIsLoading(false);
  }

  return (
    <>
     <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ... </p>}
        {!isLoading && movies.length === 0 && <p>Found no Movies! </p>}
        {!isLoading && movies.length !==0 && <MovieList movies={movies} />}
      </section>
    </>
  );
}

export default App;
