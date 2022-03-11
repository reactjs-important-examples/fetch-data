import React, { useState } from 'react';

import MovieList from './Components/MovieList';
import './App.css';

function App() {
  
  const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  const[movies , setMovies] = useState(dummyMovies);

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
  }

  return (
    <>
     <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </>
  );
}

export default App;
