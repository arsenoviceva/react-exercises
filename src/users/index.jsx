import { Container, Row, Col, Button } from "react-bootstrap";
import { UserCard } from "./components/UserCard";
import { useEffect, useState } from "react";
import { companies } from "../object/companies";
import { ModalDelete } from "./components/ModalDelete";
import { ModalCreateUser } from "./components/ModalCreateUser";
import { ModalSuccess } from "./components/ModalSuccess";

export const Users = () => {
  const savedUsers = JSON.parse(localStorage.getItem("listOfUsers"));
  const [users, setUsers] = useState(savedUsers);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [openModalDel, setOpenModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const handleChange = (e) => {
    const company = e.target.value;
    setSelectedCompany(company);
    if (company === "all") {
      setUsers(savedUsers);
    } else {
      const filteredUsers = savedUsers.filter(
        (user) => user?.company?.name === company
      );
      setUsers(filteredUsers);
    }
  };

  const userActionHandler = (id) => {
    console.log(id, "id");
    const updatedList = savedUsers.map((current) => {
      if (current.id === id) {
        return {
          ...current,
          isDeleted: !current.isDeleted,
        };
      }
      return current;
    });
    setUsers(updatedList);
    localStorage.setItem("listOfUsers", JSON.stringify(updatedList));
    setOpenModalDelete(false);
  };

  const openModalDelHandler = (id) => {
    const currentUser = savedUsers.find((user) => user.id === id);
    setSelectedUser(currentUser);
    setOpenModalDelete(true);
  };
  const closeModalDelHandler = () => {
    setOpenModalDelete(false);
  };
  const openModalCreateHandler = () => {
    setSelectedUser({});
    setOpenModalCreate(true);
  };
  const closeModalCreateHandler = () => {
    setOpenModalCreate(false);
  };

  const closeModalSuccessHandler = () => {
    setOpenModalSuccess(false);
  };
  const handlerUserChange = (e, object) => {
    const { value, name } = e.target;
    if (object) {
      setSelectedUser((prev) => ({
        ...prev,
        [object]: { ...prev[object], [name]: value },
      }));
    } else {
      setSelectedUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  const createUserHandler = () => {
    const userToSave = {
      ...selectedUser,
      id: Math.floor(Math.random() * (50 - 11) + 11),
    };
    const newUser = savedUsers.concat(userToSave);
    setSelectedUser(userToSave);
    //localStorage.setItem("listOfUsers", JSON.stringify(newUser));
    setUsers(newUser);
    setOpenModalCreate(false);
    setOpenModalSuccess(true);
  };
  const returnToUserList = () => {
    setOpenModalCreate(false);
    setOpenModalSuccess(false);
  };

  useEffect(() => {
    localStorage.setItem("listOfUsers", JSON.stringify(users));
  }, [users.length]);
  return (
    <Container>
      <Row className="w-100 my-3 justify-content-between ">
        <Col md={4} className="d-flex flex-column gap-3">
          <select
            className="bg-success w-50 border-0 text-white form-select text-center"
            onChange={handleChange}
            value={selectedCompany}
          >
            <option value="all"> Filter by company</option>
            {companies?.map((company) => {
              return <option key={company.id}> {company.name}</option>;
            })}
          </select>
          <Button className="w-50" onClick={openModalCreateHandler}>
            {" "}
            Create new user
          </Button>
        </Col>
        <Col md={8} className="d-flex flex-column">
          {users?.map((user) => {
            return (
              <UserCard
                user={user}
                key={user.id}
                onClick={openModalDelHandler}
                isDeleted={user.isDeleted}
                restore={userActionHandler}
              />
            );
          })}
        </Col>
      </Row>
      <ModalDelete
        open={openModalDel}
        close={closeModalDelHandler}
        onClick={userActionHandler}
        name={selectedUser.name}
        user={selectedUser}
      />
      <ModalCreateUser
        open={openModalCreate}
        close={closeModalCreateHandler}
        user={selectedUser}
        handleChange={handlerUserChange}
        onClick={createUserHandler}
      />
      <ModalSuccess
        open={openModalSuccess}
        user={selectedUser}
        close={closeModalSuccessHandler}
        onClick={returnToUserList}
      />
    </Container>
  );
};
