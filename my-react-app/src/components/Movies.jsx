
import React, { useState, useEffect } from 'react';


const Movies = () => {
  const [movies, setMovies] = useState([]); //holds titles
  const [filteredMovie, setFilteredMovie] = useState(null); //holds details

  useEffect(() => {
   
    const fetchXMenMovies = async () => {  //Similar to a GET request
      const apiKey = 'f22241e5';
      const response = await fetch(
        `https://www.omdbapi.com/?s=X-men&apikey=${apiKey}`
      );

      if (response.ok) { //checks for successful response
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);  //checks for array with search
        } 
      }
    };

    fetchXMenMovies();
  }, []);  //Memorize this notation

  const fetchMovieDetails = async (imdbID) => { //finds details using imdbID number
    const apiKey = 'f22241e5'; 
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    );

    if (response.ok) {  //On success adds data to 'filtered movie' state
      const data = await response.json();
      setFilteredMovie(data);
    } 
  };

  const closeDetails = () => {    //This is called when the x-button is clicked
    setFilteredMovie(null);       //resets page
  };

  return (
    <div className = "title">
      <h1>X-Men Movies</h1>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} class="movie-item">
            <img src={movie.Poster} alt={'Xmen'} />
            <h3>{movie.Title}</h3>
            <button onClick={() => fetchMovieDetails(movie.imdbID)}>
              Show Details
            </button>
          </div>
        ))}
      </div>

      {filteredMovie && (  //conditional rendering for SHowDetails button when fetchMovieDetails function is called
        <div className="topWindow">
          <div className="filtered-movie">
            <button onClick={closeDetails} class="x-button">
              Close
            </button>
            <h2>{filteredMovie.Title}</h2>
            <p>Year: {filteredMovie.Year}</p>
            <p>Director: {filteredMovie.Director}</p>
            <p>IMDb Rating: {filteredMovie.imdbRating}</p>
            <p>Plot: {filteredMovie.Plot}</p>
            <img src={filteredMovie.Poster} alt={'XmenMovies'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;

