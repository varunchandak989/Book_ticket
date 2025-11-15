import React from "react";
import Navbar from "../components/navBar";
import { useState, useEffect } from "react";
import { getAllMovies } from "../calls/moviecalls";
import MovieCard from "../components/movieCard";

function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const movies = await getAllMovies();
      setMovies(movies.data);
    })();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {movies &&
          movies.map((movieObj, index) => (
            <MovieCard
              key={index}
              title={movieObj.title}
              posterUrl={movieObj.posterPath}
              language={movieObj.language}
              rating={movieObj.ratings}
              genre={movieObj.genre}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;