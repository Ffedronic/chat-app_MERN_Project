import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPower } from "react-icons/bs"
import { SetDisconnection } from "../utils/store";

function ChatContainer() {
    const dispatch = useDispatch();
  const contactAvatar = useSelector(
    (state) => state.SelectedContact.avatarImage
  );
  const contactUsername = useSelector(
    (state) => state.SelectedContact.username
  );
  return (
    <section className="p-2">
      <article id="chatContainer-header" className=" d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img
            className="w-25 me-2"
            src={`data:image/svg+xml;base64,${contactAvatar}`}
            alt={`${contactUsername}-avatar`}
          />
          <p className="fs-4 fw-bold text-black-50">{contactUsername}</p>
        </div>
        <BsPower onClick={() => dispatch(SetDisconnection())} className="display-1 bg-body p-2 rounded-circle border border-1 shadow-lg"/>
      </article>
      <article id="chatContainer-messages"></article>
      <article id="chatContainer-input"></article>
    </section>
  );
}

export default ChatContainer;
