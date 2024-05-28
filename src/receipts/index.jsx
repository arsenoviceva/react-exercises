import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RecipeCard } from "./components/RecipeCard";
import { useState } from "react";
import { listOfRecipes } from "../object/listOfRecipes";
import { FilterRecipe } from "./components/FilterRecipe";
import { ModalRecipe } from "./components/ModalRecipe";
import { ModalDelete } from "./components/ModalDelete";

const inititalRecipe = {
  name: "",
  category: "",
  ingredients: [],
  instructions: "",
};
export const Recipes = () => {
  const savedRecipeList = JSON.parse(localStorage.getItem("listOfRecipes"));
  const [recipes, setRecipes] = useState(savedRecipeList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedGenre] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(inititalRecipe);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const recipesList = savedRecipeList.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
      // return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setRecipes(recipesList);
  };

  const handleChange = (e) => {
    const category = e.target.value;
    setSelectedGenre(category);
    if (category === "All") {
      setRecipes(savedRecipeList);
    } else {
      const recipesList = savedRecipeList.filter((item) => {
        return item.category === category;
      });

      setRecipes(recipesList);
    }
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setCurrentRecipe(inititalRecipe);
  };

  const handleChangeCurrentIngredient = (e) => {
    setCurrentIngredient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewRecipeHandler = (e) => {
    const { value, name } = e.target;
    setCurrentRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const clickHandler = (isUpdate, id) => {
    if (isUpdate) {
      const updatedRecipe = savedRecipeList?.map((recipe) => {
        if (recipe.id === id) {
          return currentRecipe;
        }
        return recipe;
      });
      //localStorage.setItem("listOfRecipes", JSON.stringify(updatedRecipe));

      setRecipes(updatedRecipe);
    } else {
      const newRecipe = savedRecipeList.concat({
        ...currentRecipe,
        id: Math.random(),
      });
      //localStorage.setItem("listOfRecipes", JSON.stringify(newRecipe));

      setRecipes(
        newRecipe.filter((recipe) =>
          !!searchQuery?.length
            ? recipe.name
                .toLowerCase()
                .includes(searchQuery.toLocaleLowerCase())
            : true
        )
      );
    }
    setOpenModal(false);
    setCurrentRecipe(inititalRecipe);
  };

  const deleteModalHandler = (recipeId) => {
    const currentRecipe = savedRecipeList.find(
      (recipe) => recipe.id === recipeId
    );
    setCurrentRecipe(currentRecipe);
    setOpenModalDelete(true);
  };
  const closeModalDel = () => {
    setOpenModalDelete(false);
  };

  const onUpdateHandler = (id) => {
    const selectedRecipe = savedRecipeList.find((receipe) => receipe.id === id);
    setCurrentRecipe(selectedRecipe);
    openModalHandler();
  };

  const deleteRecipeHandler = (id) => {
    const recipesList = savedRecipeList.filter((recipe) => recipe.id !== id);
    // localStorage.setItem("listOfRecipes", JSON.stringify(recipesList));
    setCurrentRecipe({});
    setRecipes(recipesList);
    setOpenModalDelete(false);
  };

  const deleteIngredientHandler = (id) => {
    setCurrentRecipe((prev) => ({
      ...prev,
      ingredients: prev?.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    }));
  };

  const updateIngredientHandler = (id) => {
    const currentIng = currentRecipe?.ingredients?.find(
      (ingredient) => ingredient.id === id
    );
    setCurrentIngredient(currentIng);
  };

  const onKeyDown = (e) => {
    console.log(e.code);
    if (!currentIngredient?.name?.trim().length && e.code.includes("Enter")) {
      alert("Empty input field not allowed!");
      return;
    }
    if (e.code.includes("Enter") && !currentIngredient.id) {
      setCurrentIngredient({ name: "" });
      // enter pressed, create element
      setCurrentRecipe((prev) => ({
        ...prev,
        ingredients: (prev?.ingredients || [])?.concat({
          name: currentIngredient?.name,
          id: Math.random(),
        }),
      }));
    } else if (e.code.includes("Enter") && !!currentIngredient.id) {
      //  it's enter + it's updating because we have ID inside object
      setCurrentIngredient({ name: "" });
      setCurrentRecipe((prev) => ({
        ...prev,
        ingredients: prev?.ingredients?.map((ingredient) => {
          if (ingredient.id === currentIngredient.id) {
            return currentIngredient;
          }
          return ingredient;
        }),
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem("listOfRecipes", JSON.stringify(recipes));
  }, [recipes.length]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1> Receipts</h1>
        </Col>
      </Row>
      <FilterRecipe
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        handleChange={handleChange}
        handleSearch={handleSearch}
        onClick={openModalHandler}
      />

      <div className=" row gy-3  w-100 my-2">
        {recipes.length > 0 ? (
          recipes?.map((recipe) => {
            return (
              <Col md={6}>
                <RecipeCard
                  id={recipe.id}
                  recipe={recipe}
                  onUpdateHandler={onUpdateHandler}
                  key={recipe.id}
                  name={recipe.name}
                  category={recipe.category}
                  instructions={recipe.instructions}
                  onDeleteHandler={deleteModalHandler}
                />
              </Col>
            );
          })
        ) : (
          <Col>
            {" "}
            <h3> List is empty</h3>
          </Col>
        )}
      </div>
      <ModalRecipe
        open={openModal}
        close={closeModal}
        onClick={clickHandler}
        currentRecipe={currentRecipe}
        currentIngredient={currentIngredient}
        handleChangeCurrentIngredient={handleChangeCurrentIngredient}
        handleChange={createNewRecipeHandler}
        onKeyDown={onKeyDown}
        deleteIngredient={deleteIngredientHandler}
        updateIngredient={updateIngredientHandler}
      />
      <ModalDelete
        open={openModalDelete}
        title={currentRecipe.name}
        close={closeModalDel}
        onClick={() => deleteRecipeHandler(currentRecipe.id)}
      />
    </Container>
  );
};
