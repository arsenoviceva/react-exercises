export const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <div className="card-body">
        <p> </p>
        <div>
          <p> {movie.title} </p>
          <p> {movie.genre}</p>
        </div>
      </div>
    </div>
  );
};
