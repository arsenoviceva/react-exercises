import { useState } from "react";
import { MovieCard } from "./components/MovieCard";
import { FilterMovie } from "./components/FilterMovie";
import { Container, Row, Col, Button } from "react-bootstrap";

export const Movies = () => {
  const moviesData = [
    {
      id: 1,
      title: "Film 1",
      genre: "Akcija",
    },
    {
      id: 2,
      title: "Film 2",
      genre: "Drama",
    },
    {
      id: 3,
      title: "Film 3",
      genre: "Komedija",
    },
    {
      id: 4,
      title: "Film 4",
      genre: "Akcija",
    },
    {
      id: 5,
      title: "Film 5",
      genre: "Triler",
    },
  ];
  const genres = [
    { id: 1, name: "Akcija" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Komedija" },
    { id: 4, name: "Triler" },
  ];

  const [moviesList, setMoviesList] = useState(moviesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setMoviesList(moviesData);
      setSearchQuery(query);
      return;
    }

    const searchList = moviesData.filter((item) => {
      return item.genre.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      //return item.genre;
    });
    setMoviesList(searchList);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSelectedGenre(query);
    console.log(query);

    if (query === "All") {
      setMoviesList(moviesData);
    } else {
      const filteredList = moviesData.filter((item) => {
        return item.genre === query;
      });
      console.log(filteredList);
      setMoviesList(filteredList);
    }
  };

  const cleanFilter = () => {
    setMoviesList(moviesData);
    setSearchQuery("");
  };

  return (
    <Container>
      <FilterMovie
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        cleanFilter={cleanFilter}
        handleChange={handleChange}
        selectedGenre={selectedGenre}
        genres={genres}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {moviesList.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </Container>
  );
};
