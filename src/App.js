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
import { Calculator } from "./calculator";
import { JobListings } from "./job-listing";
import { FaQ } from "./faq";
import { ECommerce } from "./ecommerce-product-page-main";
import { JsonExerciseGet } from "./jJSONExerciseGET";
import { MonsterRolodex } from "./monsters-rolodex";
import { JsonExerciseGetUser } from "./jJSONExerciseGET/components/JsonExerciseGetUser";
import { PostsList } from "./posts-list";
import { OpenedPost } from "./posts-list/components/OpenedPost";
import { Gallery } from "./gallery";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/test" element={<Test />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/job-listings" element={<JobListings />} />
        <Route path="/faq" element={<FaQ />} />
        <Route path="/ecommerce" element={<ECommerce />} />
        <Route path="/jsonexerciseget" element={<JsonExerciseGet />} />
        <Route path="/jsonexerciseget/:id" element={<JsonExerciseGetUser />} />
        <Route path="/monster-rolodex" element={<MonsterRolodex />} />
        <Route path="/posts-list" element={<PostsList />} />
        <Route path="/posts-list/:id" element={<OpenedPost />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default App;
