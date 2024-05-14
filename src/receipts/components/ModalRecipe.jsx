import {
  MdOutlineSystemSecurityUpdateGood,
  MdOutlineDelete,
} from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

export const ModalRecipe = ({
  open,
  close,
  onClick,
  handleChange,
  onKeyDown,
  currentRecipe,
  currentIngredient,
  handleChangeCurrentIngredient,
  deleteIngredient,
  updateIngredient,
}) => {
  const { category, name, instructions, ingredients, id } = currentRecipe;
  const isUpdate = !!id;
  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>
          {isUpdate ? "Update recipe" : "Create a new recipe"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6 className="my-3"> Recipe name </h6>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <select
          onChange={handleChange}
          name="category"
          value={category}
          className="my-2 form-select text-black"
        >
          <option value="Choose"> Choose category</option>
          <option value="Main course"> Main course</option>
          <option value="Dessert"> Dessert </option>
          <option value="Salad"> Salad </option>
        </select>

        <h6 className="my-3"> Ingredietns</h6>
        <input
          className="form-control"
          name="name"
          type="text"
          value={currentIngredient?.name}
          onKeyDown={onKeyDown}
          onChange={handleChangeCurrentIngredient}
        />
        <div>
          {ingredients?.map((ingredient) => {
            return (
              <div key={ingredient.id} className="gap-3">
                {ingredient.name}
                <MdOutlineSystemSecurityUpdateGood
                  onClick={() => updateIngredient(ingredient.id)}
                  className="fs-5"
                />
                <MdOutlineDelete
                  onClick={() => deleteIngredient(ingredient.id)}
                  className="fs-5"
                />
              </div>
            );
          })}
        </div>

        <h6 className="my-3"> Write your instructions here</h6>

        <textarea
          className="form-control"
          name="instructions"
          value={instructions}
          onChange={handleChange}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onClick(isUpdate, id)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
