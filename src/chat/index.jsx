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
  const [newConversation, setNewConversation] = useState({
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
    setSelectedUserID(user.messageId);
    setSelectedConversation({
      user: user,
      conversation: messages[user.messageId],
    });
  };

  const newMessageHandler = (e) => {
    const query = e.target.value;
    setMessage(query);
  };

  const saveNewMessageHandler = (e) => {
    if (message.trim().length > 0) {
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
      const currentChatIndex = newData.user.messageId;
      messages[currentChatIndex] = newData.conversation;
      localStorage.setItem("allMessages", JSON.stringify(messages));
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
    setNewConversation((prev) => ({
      ...prev,
      [name]: value,
      isSeen: true,
      createdAt: date.getHours() + ":" + date.getMinutes() + "PM",
      messageId: Math.floor(Math.random() * (999 - 50) + 50),
      userPhoto: "https://source.unsplash.com/100x100/?portrait",
    }));
  };

  const createNewConversationHandler = () => {
    console.log(newConversation, "gg");
    if (
      !newConversation?.message?.length ||
      !newConversation?.username?.length
    ) {
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
      setNewConversation("");
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
    <div className="center-chatbox-wrapper">
      <Container className="bg-white chat-border-radius ">
        <Row className="w-100 chat-border-radius">
          <Col lg={4} className="bg-info p-0 chat-border-radius ">
            <Row className="align-items-center my-4">
              <Col lg={3}>
                <img src="/images/user3.jpg" className="user-photo w-100" />
              </Col>
              <Col lg={9}>
                <h5 className="text-primary"> Markovic Marija</h5>
              </Col>
            </Row>
            <div className="mx-2 border-bottom">
              <input
                type="text"
                className="form-control rounded-5 my-2"
                placeholder="Search friends"
                value={searchUser}
                onChange={handleChange}
              />
            </div>
            <div className="overflow-conversations">
              {!!userList?.length ? (
                userList?.map((user) => {
                  // console.log(user);
                  return (
                    <User
                      user={user}
                      onClick={openChatHandler}
                      selectedUser={selectedUserID}
                    />
                  );
                })
              ) : (
                <div className="row p-2">
                  <div className="col-12">
                    <h6>List is empty</h6>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-1 p-2 border-top">
              <Button onClick={openModalHandler} className=" w-100 ">
                Start a new conversation
              </Button>
            </div>
          </Col>

          <Col lg={8}>
            {!selectedConversation.conversation.length ? (
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
    </div>
  );
};
