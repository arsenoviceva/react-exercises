export const MonsterCard = ({ user }) => {
  return (
    <div className="card card-monster" style={{ width: "18rem" }}>
      <img
        src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
        className="card-img-top p-3"
        alt="..."
      />
      <div className="card-body text-center">
        <p className="monster-card-name">{user.name}</p>
        <p className="monster-card-text"> {user.email}</p>
      </div>
    </div>
  );
};
