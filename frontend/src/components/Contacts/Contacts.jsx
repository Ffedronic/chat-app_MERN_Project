import React, { useState } from "react";
import "./Contacts.css";
import {useDispatch, useSelector } from "react-redux";
import { SetSelectedContact } from "../../utils/store";


function Contacts({ contacts }) {

  const dispatch = useDispatch();
 
  const [selectedContact, setSelectedContact] = useState("");
 
  const SetContact = (index) => {
    setSelectedContact(index);
    dispatch(SetSelectedContact(contacts[index]));
  }
 
  return (
    <div className="">
      <ul className="p-md-2 rounded rounded-3 list-unstyled d-flex flex-md-column overflow-auto mt-2 list border border-1 shadow">
        {contacts.map((contact, index) => {
          return (
            <li
              key={index}
              className={`bg-success mb-md-3 bg-opacity-25 d-flex justify-content-md-center align-items-center p-1 me-2 me-md-0 ${
                selectedContact === index
                  ? "bg-warning bg-opacity-75 rounded-3 border-danger"
                  : ""
              }`}
              onClick={() => {
                SetContact(index)
              }}
            >
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt={`${index}-avatar`}
              />
              <p className="mx-3 fw-bold text-white fs-4">{contact.username}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Contacts;
