import React from "react";
import Robot from "../assets/robot.gif";
import { useSelector } from "react-redux";

function Welcome() {
  const currentUserUsername = useSelector((state) => state.userName);

  return (
    <div className="text-center">
      <img className="img-fluid" src={Robot} alt="robot welcome" />
      <p className="fs-1 text-black-50 fw-bold">
        Welcome <span className=" text-primary">{currentUserUsername}</span> ! <br />
        Choose a contact before chatting.
      </p>
    </div>
  );
}

export default Welcome;
