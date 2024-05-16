import { Button, Container, Row, Col } from "react-bootstrap";
import { listOfUsers } from "../object/listOfUsers";
import { User } from "./components/User";
import { useEffect, useState } from "react";
import { MessageContent } from "./components/MessageContent";
import { messagesByMessageId } from "../object/messagesByMessageId";
import EmptyState from "./components/EmptyState";
import {
  CreateNewConversationModal,
  CreateNewUserModal,
} from "./components/CreateNewConversationModal";

const initialConversation = {
  user: {},
  conversation: [],
};

export const Chat = () => {
  const messages = JSON.parse(localStorage.getItem("allMessages"));
  const conversations = JSON.parse(localStorage.getItem("listOfConversation"));
  const [userList, setUserList] = useState(conversations);
  const [searchUser, setSearchUser] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState(initialConversation);
  const [message, setMessage] = useState("");
  const [selectedUserID, setSelectedUserID] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [newConversation, SetNewConversation] = useState({
    username: "",
    message: "",
    messageId: null,
  });

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchUser(query);
    if (!query) {
      setUserList(conversations);
      return;
    }
    const searchList = conversations.filter((user) => {
      return user.username.toLowerCase().includes(query.toLowerCase());
    });
    setUserList(searchList);
  };

  const openChatHandler = (user) => {
    let found;
    for (const [key, value] of Object.entries(messages)) {
      if (+user.messageId === +key) {
        found = value;
        setSelectedUserID(key);
      }
    }
    setSelectedConversation({
      user: user,
      conversation: found,
    });
  };

  const newMessageHandler = (e) => {
    const query = e.target.value;
    setMessage(query);
  };

  const saveNewMessageHandler = (e) => {
    if (message.length > 0) {
      const newData = {
        ...selectedConversation,
        conversation: [
          ...selectedConversation.conversation,
          {
            byUser: {
              username: "Markovic Marija",
              userPhoto: "/images/user3.jpg",
            },
            message: message,
            isMyMessage: true,
          },
        ],
      };
      setSelectedConversation(newData);
      console.log(newData, "newData");
      console.log(messages, "messages");
      let object = {};
      for (const [key, value] of Object.entries(messages)) {
        if (+selectedConversation?.user.messageId === +key) {
          object[key] = [
            ...value,
            {
              byUser: {
                username: "Markovic Marija",
                userPhoto: "/images/user3.jpg",
              },
              message: message,
              isMyMessage: true,
            },
          ];
        } else {
          object[key] = value;
        }
      }
      console.log(object, "object");

      localStorage.setItem("allMessages", JSON.stringify(object));
      setMessage("");
    } else {
      alert("You can not send empty messages!");
    }
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const newConversationHandler = (e) => {
    const { value, name } = e.target;
    const date = new Date();
    SetNewConversation((prev) => ({
      ...prev,
      [name]: value,
      isSeen: true,
      createdAt: date.getHours() + ":" + date.getMinutes() + "PM",
      messageId: Math.floor(Math.random() * (50 - 11) + 11),
      userPhoto: "https://source.unsplash.com/100x100/?portrait",
    }));
  };

  const createNewConversationHandler = () => {
    console.log(messages);
    if (!newConversation?.message.length || !newConversation?.username.length) {
      alert("You must enter username and message");
    } else {
      const conversation = userList.concat(newConversation);
      setUserList(conversation);
      localStorage.setItem("listOfConversation", JSON.stringify(conversation));
      console.log(newConversation);

      localStorage.setItem(
        "allMessages",
        JSON.stringify({
          ...messages,
          [newConversation?.messageId]: [
            {
              byUser: {
                username: newConversation?.username,
                userPhoto: newConversation?.userPhoto,
              },
              message: newConversation.message,
              isMyMessage: false,
            },
          ],
        })
      );

      setOpenModal(false);
      SetNewConversation("");
      console.log(newConversation);
    }
  };
  useEffect(() => {
    const savedMessages = localStorage.getItem("allMessages");
    if (!savedMessages) {
      localStorage.setItem("allMessages", JSON.stringify(messagesByMessageId));
    }
  }, []);
  useEffect(() => {
    const savedConversation = localStorage.getItem("listOfConversation");
    if (!savedConversation) {
      localStorage.setItem("listOfConversation", JSON.stringify(listOfUsers));
    }
  }, []);

  return (
    <Container>
      <Row className="w-100  ">
        <Col lg={4} className="bg-info p-0 ">
          <Row className="align-items-center my-4">
            <Col lg={3}>
              <img src="/images/user3.jpg" className="user-photo w-100" />
            </Col>
            <Col lg={9}>
              <h5 className="text-primary"> Markovic Marija</h5>
            </Col>
          </Row>
          <div className="mx-2">
            <input
              type="text"
              className="form-control rounded-5 my-2"
              placeholder="Search friends"
              value={searchUser}
              onChange={handleChange}
            />
          </div>
          <div className="overflow-conversations">
            {userList?.map((user) => {
              // console.log(user);
              return (
                <User
                  user={user}
                  onClick={openChatHandler}
                  selectedUser={selectedUserID}
                />
              );
            })}
          </div>
          <div className="mx-1 p-2">
            <Button onClick={openModalHandler} className=" w-100 ">
              Start a new conversation
            </Button>
          </div>
        </Col>

        <Col lg={8} className="border border-1">
          {selectedConversation.conversation.length === 0 ? (
            <EmptyState />
          ) : (
            <MessageContent
              selectedConversation={selectedConversation}
              onChange={newMessageHandler}
              onClick={saveNewMessageHandler}
              message={message}
            />
          )}
        </Col>
      </Row>
      <CreateNewConversationModal
        open={openModal}
        close={closeModalHandler}
        handleChange={newConversationHandler}
        onClick={createNewConversationHandler}
      />
    </Container>
  );
};
