import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const FilterMovie = ({
  searchQuery,
  handleSearch,
  cleanFilter,
  handleChange,
  selectedGenre,
  genres,
}) => {
  return (
    <>
      <h1 className="mt-5"> Filter the list of movies</h1>
      <div className="w-100 d-flex align-items-center justify-content-center gap-3 my-5">
        <input
          type="text"
          name="search"
          className="form-control w-25"
          placeholder="Search movie genre"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button onClick={cleanFilter}> Clear filter </Button>

        <select
          onChange={handleChange}
          value={selectedGenre}
          className="form-select text-black w-25"
        >
          <option value="All"> All</option>
          {genres?.map((item) => {
            return (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
