import React, { useCallback, useEffect, useState } from 'react';

import MovieList from './Components/MovieList';
import './App.css';

function App() {
  const[movies , setMovies] = useState([]);
  const[isLoading , setIsLoading] = useState(false);
  const[error, setError] = useState(null);

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

  

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch('https://swapi.dev/api/films/');

      if(!response.ok){
        throw new Error('Somthing went wrong! ')
      }

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
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  } , []);

  
  useEffect( () => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>
  
  if(movies.length > 0)  content = <MovieList movies={movies} /> ;
  if(isLoading) content = <p>Loading ... </p>;
  if(error) content = <p>{error}</p>;

  return (
    <>
     <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </>
  );
}

export default App;
