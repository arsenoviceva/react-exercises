import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdOutlineDeleteForever } from "react-icons/md";

export const CartModal = ({
  show,
  price,
  counter,
  close,
  total,
  onClickDelete,
}) => {
  return (
    <div className="cart-window">
      <div className="border-1 border-bottom py-2">
        <strong> Cart</strong>
      </div>
      <div className="d-flex align-items-center gap-3 py-3">
        <img src="images/ecommerce/image-product-1.jpg" className="cart-img" />
        <div>
          {" "}
          <p> Fall Limited Edition Sneakers </p>
          <p>
            {" "}
            ${price}.00 x {counter} <strong> ${total}.00</strong>
          </p>
        </div>

        <MdOutlineDeleteForever
          className="fs-4 text-muted cursor-pointer"
          onClick={onClickDelete}
        />
      </div>
      <div className="border-0">
        <Button className="checkout-btn"> Checkout</Button>
      </div>
    </div>
  );
};
