import React from "react";
import { Route, Routes } from "react-router";

import "./App.scss";
import { Movies } from "./movies";
import { Tasks } from "./tasks";
import { Recipes } from "./receipts";
import { Home } from "./home";
import { Exercises } from "./exercises";
import { Users } from "./users";
import { SingleUser } from "./users/components/SingleUser";
import { Quiz } from "./quiz";
import { Test } from "./test";
import { Chat } from "./chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/users" element={<Users />} />{" "}
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/quiz" element={<Quiz />} />{" "}
        <Route path="/test" element={<Test />} />{" "}
        <Route path="/chat" element={<Chat />} />{" "}
      </Routes>
    </>
  );
}

export default App;
