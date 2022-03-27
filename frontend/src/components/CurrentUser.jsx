import React from "react";
import { useSelector } from "react-redux";


/**
 * This function returns a div with an image and a username
 * @returns The current user avatar image and username.
 */
function CurrentUser() {
  const currentUserAvatarImage = useSelector((state) => state.avatarIs);
  const currentUserUsername = useSelector((state) => state.userName);

  return (
    <div className="bg-primary bg-opacity-25 bg-gradient text-center mt-2 pt-2 d-md-flex justify-content-md-around align-items-md-center rounded rounded-3 shadow">
      <img
        className="w-50"
        src={`data:image/svg+xml;base64,${currentUserAvatarImage}`}
        alt={`${currentUserUsername}-avatar`}
      />
      <p className="mx-3 fw-bold text-black fs-2">{currentUserUsername}</p>
    </div>
  );
}

export default CurrentUser;
