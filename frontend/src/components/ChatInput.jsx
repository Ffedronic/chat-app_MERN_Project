import React, { useState } from "react";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

/**
 * It displays the chat input
 * @returns The ChatInput component is returning a form that has an input field and a button. The input
 * field is used to enter the message and the button is used to send the message.
 */
function ChatInput({ handleSendMessage }) {

  const selectedContactUsername = useSelector(
    (state) => state.SelectedContact.username
  );

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [message, setMessage] = useState("");

  /**
   * *This function is used to toggle the emoji picker on and off.*
   */
  const HandleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  /**
   * The function takes in an event and an emoji object. It then adds the emoji to the message
   */
  const HandleEmojiClick = (event, emoji) => {
    let messageWithEmoji = message;
    messageWithEmoji += emoji.emoji;
    setMessage(messageWithEmoji);
  };

  /**
   * It sends a message to the server.
   */
  const SendChat = (event) => {
    event.preventDefault();
    handleSendMessage(message);
    setMessage("");
  };

  return (
    <article className="d-flex flex-column align-items-end flex-md-row align-items-md-end">
      <div
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Choose a emoji here"
      >
        <BsEmojiSmileFill
          onClick={HandleEmojiPicker}
          className="fs-2 me-2 text-warning bg-black rounded-circle"
        />
        {showEmojiPicker && <Picker onEmojiClick={HandleEmojiClick} />}
      </div>
      <Form
        onSubmit={(e) => SendChat(e)}
        className="d-flex justify-content-between align-items-end w-100"
      >
        <Form.Group controlId="formBasicMsg" className="w-100">
          <Form.Label className="fw-bold">
            Chat with{" "}
            <span className="text-success fw-bold">
              {selectedContactUsername} !!!
            </span>
          </Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">
              <IoMdSend />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </article>
  );
}

export default ChatInput;
