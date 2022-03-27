import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPower } from "react-icons/bs";
import { SetDisconnection } from "../utils/store-redux/store";

/**
 * This function creates the chat header
 * @returns The ChatHeader component is returning an article element with a class of d-flex
 * justify-content-between. This is a container element that allows the avatar image and username to be
 * placed side-by-side.
 */
function ChatHeader() {
  const dispatch = useDispatch();

  /* This is a Redux hook that allows us to access the avatarImage `SelectedContact` state. */
  const contactAvatar = useSelector(
    (state) => state.SelectedContact.avatarImage
  );

  /* This is a Redux hook that allows us to access the username `SelectedContact` state. */
  const contactUsername = useSelector(
    (state) => state.SelectedContact.username
  );

  return (
    <article
      className=" d-flex justify-content-between"
    >
      <div className="d-flex align-items-center">
        <img
          className="w-25 me-2"
          src={`data:image/svg+xml;base64,${contactAvatar}`}
          alt={`${contactUsername}-avatar`}
        />
        <p className="fs-4 fw-bold text-black-50">{contactUsername}</p>
      </div>
      <BsPower
        onClick={() => dispatch(SetDisconnection())}
        className="display-1 bg-body p-2 rounded-circle border border-1 shadow-lg"
      />
    </article>
  );
}

export default ChatHeader;
