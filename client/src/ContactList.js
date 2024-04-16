import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const ContactsList = (props) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async (t) => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    let res = await fetch(`http://localhost:4000/contacts`, {
      headers: {
        "jwt-token": token,
      },
    });
    res = await res.json();
    setContacts(res?.contacts);
  };

  useEffect(() => {
    if (!props?.filteredContacts) {
      fetchContacts();
    } else {
      setContacts(props?.filteredContacts);
    }
  }, [props.filter, props?.filteredContacts]);

  const renderedContacts = useMemo(
    () =>
      (contacts || []).map((contact) => {
        return (
          <li
            className="list-group-item "
            key={contact._id}
            style={{ width: "18rem;" }}
          >
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{`${contact.firstName} ${contact.lastName}`}</h2>
                <h3 className="card-subtitle mb-2 text-muted">
                  {contact.phone}
                </h3>
                <h3 className="card-text mb-2 text-muted">{contact.address}</h3>
                <h4 className="card-text mb-2 text-muted">{`${
                  contact.lat || ""
                }-${contact.lon || ""}`}</h4>
                <p className="card-text mb-2 text-muted">
                  {contact.description}
                </p>
                <Link
                  to={`/edit-contact/${contact._id}`}
                  className="btn btn-success"
                >
                  EDIT
                </Link>
              </div>
            </div>
          </li>
        );
      }),
    [contacts]
  );

  return (
    <div className="d-flex flex-row flex-wrap contacts-container">
      <ul className="list-group" style={{ width: "100%" }}>
        {renderedContacts}
      </ul>
    </div>
  );
};

export default ContactsList;
