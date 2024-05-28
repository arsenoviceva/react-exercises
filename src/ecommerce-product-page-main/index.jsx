import { Container, Row, Col } from "react-bootstrap";
import { NavbarCollapse } from "./navbar/Navbar";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { MdOutlineShoppingCart } from "react-icons/md";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { CartModal } from "./navbar/CartModal";

export const ECommerce = () => {
  const price = 125.0;
  const images = [
    { src: "/images/ecommerce/image-product-1.jpg" },
    { src: "/images/ecommerce/image-product-2.jpg" },
    { src: "/images/ecommerce/image-product-3.jpg" },
    { src: "/images/ecommerce/image-product-4.jpg" },
  ];

  const [open, setOpen] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);
  const [added, setAdded] = useState(false);
  const [counterAdded, setCounterAdded] = useState(0);
  const [index, setIndex] = useState(0);

  const openCartModalHandler = () => {
    setOpenCartModal(!openCartModal);
  };
  const closeCartModalHandler = () => {
    setOpenCartModal(false);
  };

  const increaseCounter = () => {
    setCounter((prev) => prev + 1);
    console.log(counter);
  };
  const decreaseCounter = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    } else {
      alert("You can not click '-' when 0 is selected");
    }
  };
  const addedToChart = () => {
    setAdded((prev) => true);
    setCounterAdded((prev) => prev + counter);
    setTotal((prev) => prev + price * counter);

    setCounter(0);
  };
  const deleteProductHandler = () => {
    setOpenCartModal(false);
    setCounterAdded(0);
    setCounter(0);
    setTotal(0);
  };
  console.log(added, counter, counterAdded);
  return (
    <>
      <NavbarCollapse
        onClick={openCartModalHandler}
        counter={counterAdded}
        added={added}
      />
      <Container>
        <Row className="ecommerce-row">
          <Col lg={6}>
            {/* <img
              src="/images/ecommerce/image-product-1.jpg"
              className="rounded-4 w-100"
              onClick={() => setOpen(true)}
            />
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              plugins={[Thumbnails]}
              slides={[
                { src: "/images/ecommerce/image-product-1.jpg" },
                { src: " /images/ecommerce/image-product-2.jpg" },
                { src: "/images/ecommerce/image-product-3.jpg" },
                { src: "/images/ecommerce/image-product-4.jpg" },
              ]}
            /> */}

            <div>
              <div className="main-image">
                <img
                  src={images[index].src}
                  alt="Main"
                  onClick={() => setOpen(true)}
                  className="product-img"
                />
              </div>
              <div className="thumbnails">
                {images.map((image, i) => (
                  <img
                    key={i}
                    src={image.src}
                    alt={`Thumbnail ${i}`}
                    onClick={() => setIndex(i)}
                    className="thumbnail-img"
                  />
                ))}
              </div>

              {open && (
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={images}
                  plugins={[Thumbnails]}
                  index={index}
                  on={{
                    slideChange: ({ index }) => setIndex(index),
                  }}
                />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="product-info">
              <p className="text-muted py-2"> SNEAKER COMPANY </p>
              <h1 className="h1-bold pb-3"> Fall Limited Edition Sneakers</h1>
              <p className="ecommerce-text text-muted">
                These low-profile sneakers are your perfect casual wear
                companion. Featuring a durable rubber outer sole, they’ll
                withstand everything the weather can offer.
              </p>
              <div className="d-flex align-items-center gap-2 py-2">
                <p className="fs-2"> ${price}.00</p>{" "}
                <p className="bg-black px-2 py-1 text-white rounded-3"> 50% </p>
              </div>
              <p className="text-muted text-decoration-line-through">
                {" "}
                $250.00
              </p>
              <div className="increase-add-row">
                <div className="increase-product px-2">
                  <p className="increase-sign" onClick={decreaseCounter}>
                    {" "}
                    -{" "}
                  </p>{" "}
                  <p> {counter}</p>{" "}
                  <p className="increase-sign" onClick={increaseCounter}>
                    {" "}
                    +{" "}
                  </p>
                </div>
                <div
                  className={counter > 0 ? "add-to-cart" : "disabled-add"}
                  onClick={addedToChart}
                >
                  <MdOutlineShoppingCart className="fs-4" />
                  <p> Add to cart</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {openCartModal && counterAdded > 0 ? (
        <CartModal
          // show={openCartModal}
          // close={closeCartModalHandler}
          price={price}
          counter={counterAdded}
          total={total}
          onClickDelete={deleteProductHandler}
        />
      ) : openCartModal && counterAdded === 0 ? (
        <div className="cart-window">
          <div className="border-1 border-bottom py-2">
            <strong> Cart</strong>
          </div>
          <p className="d-flex justify-content-center py-5">
            {" "}
            Your cart is empty
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
