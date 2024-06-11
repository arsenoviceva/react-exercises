import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../jJSONExerciseGET/JSONURL";
import { MonsterCard } from "./components/MonsterCard";

export const MonsterRolodex = () => {
  const [value, setValue] = useState({});
  const [users, setUsers] = useState([]);

  const onChangeHandler = (e) => {
    const query = e.target.value;
    setValue((prev) => ({ ...prev, name: query }));
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`, {
        params: !!value?.name ? value : {},
      })
      .then((response) => {
        setUsers(response?.data);
        console.log(response?.data);
      });
  }, [value]);
  return (
    <div className="background-gradient-monster">
      <h1 className="monster-title">Monster Rolodex</h1>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="search monsters"
          value={value?.name}
          onChange={onChangeHandler}
          name="name"
          className="form-input p-2 rounded-1 "
        />
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap px-5 py-5 gap-5 ">
        {users?.map((user) => {
          return <MonsterCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};
