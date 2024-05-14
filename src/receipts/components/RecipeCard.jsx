import { Card, Button } from "react-bootstrap";

export const RecipeCard = ({
  id,
  name,
  category,
  instructions,
  recipe,
  onDeleteHandler,
  onUpdateHandler,
}) => {
  console.log(recipe);
  return (
    <Card key={id} className="h-100 my-2">
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <div>
          <strong> Ingredients: </strong>{" "}
          <ol className="">
            {recipe.ingredients?.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.name}</li>;
            })}
          </ol>
          <p className="text-break-word">{instructions}</p>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button
          className="m-2"
          variant="primary"
          onClick={() => onUpdateHandler(id)}
        >
          Update
        </Button>
        <Button variant="danger" onClick={() => onDeleteHandler(id)}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};
