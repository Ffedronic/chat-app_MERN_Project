import React, { useState } from "react";
import "./Contacts.css";
function Contacts({ contacts }) {
  const [selectedContact, setSelectedContact] = useState("");
  return (
    <div className="">
      <ul className=" p-md-2 rounded rounded-3 list-unstyled d-flex flex-md-column overflow-auto mt-2 list border border-1 shadow">
        {contacts.map((contact, index) => {
          return (
            <li
              key={index}
              className={`bg-success mb-md-3 bg-opacity-25 d-flex justify-content-md-center align-items-center p-1 me-2 me-md-0 ${
                selectedContact === index
                  ? "border border-5 border-primary"
                  : ""
              }`}
              onClick={() => {
                setSelectedContact(index);
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
