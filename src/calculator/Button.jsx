import { Button } from "react-bootstrap";

export const ButtonValues = ({ className, value, onClick }) => {
  return (
    <input
      type="button"
      value={value}
      className={className}
      onClick={onClick}
    />
  );
};
