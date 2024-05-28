import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from "react-bootstrap/Badge";

export const NavbarCollapse = ({ onClick, counter, added }) => {
  return (
    // <Navbar collapseOnSelect expand="lg" className="ecommerce-navbar">
    //   <Container className="ecommerce-navbar-container">
    //     <Navbar.Brand href="#home" className="">
    //       <img src="/images/ecommerce/logo.svg" />
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto gap-3">
    //         <Nav.Link
    //           href="#features"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           Collections
    //         </Nav.Link>
    //         <Nav.Link
    //           href="#pricing"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           Men
    //         </Nav.Link>
    //         <Nav.Link
    //           href="#pricing"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           Women
    //         </Nav.Link>
    //         <Nav.Link
    //           href="#pricing"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           About
    //         </Nav.Link>
    //         <Nav.Link
    //           href="#pricing"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           Contact
    //         </Nav.Link>
    //       </Nav>
    //       <Nav className="gap-5">
    //         <Nav.Link href="#deets" className="d-flex align-items-center pb-0">

    //         </Nav.Link>
    //         <Nav.Link
    //           eventKey={2}
    //           href="#memes"
    //           className="d-flex align-items-center pb-0"
    //         >
    //           <img src="/images/user1.jpg" className="ecommerce-user-img " />
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 30,
      }}
    >
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e1e1e1",
        }}
        className="container"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <div style={{ paddingBottom: 35 }}>
            <img src="/images/ecommerce/logo.svg" style={{}} />
          </div>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 0,
              marginBottom: 0,
              gap: "3rem",
            }}
            className="ecommerce-navigation"
          >
            <li className="text-muted">Collections</li>
            <li className="text-muted">Men</li>
            <li className="active ">Women</li>
            <li className="text-muted">About</li>
            <li className="text-muted">Contact</li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
            gap: "2rem",
          }}
        >
          <div>
            <MdOutlineShoppingCart className="cart-icon  " onClick={onClick} />
            {counter > 0 && added ? (
              <Badge className="badge-counter"> {counter} </Badge>
            ) : (
              ""
            )}
          </div>
          <div>
            <img src="/images/user1.jpg" className="ecommerce-user-img " />
          </div>
        </div>
      </div>
    </header>
  );
};
