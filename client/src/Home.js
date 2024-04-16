import React, { useMemo, useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContactList from "./ContactList";
import Search from "./Search";
const Home = (props) => {
  const { loggedIn, setLoggedIn } = props;
  const [contacts, setContacts] = useState(null);
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/login");
  };

  const onLogoutClick = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const handleSearchResult = useCallback(
    (result) => {
      setContacts(result);
    },
    [setContacts]
  );

  // <Link
  //           className="nav-item nav-link"
  //           href="#"
  //           onClick={() => setTopic(topic)}
  //         >
  //           {topic}
  //         </Link>
  const renderNav = useMemo(
    () => (
      <>
        <Link className="nav-item nav-link" to={"/add-contact"}>
          Add Contact
        </Link>
        <Link
          className="nav-item nav-link"
          href="#"
          onClick={() => {
            localStorage.removeItem("user");
            setLoggedIn(false);
          }}
        >
          Logout
        </Link>
      </>
    ),
    [onLogoutClick]
  );

  return (
    <div className="mainContainer">
      {loggedIn ? (
        <>
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{ width: "100%" }}
          >
            <div className="navbar-brand">PHONE CONTACTS</div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">{renderNav}</div>
            </div>
          </nav>
          <div className="nav-item nav-link">
            <Search handleResult={handleSearchResult} />
          </div>
          <div>Hi! There are your contacts</div>

          <ContactList filteredContacts={contacts} />
        </>
      ) : (
        <>
          <div>Login to see your contacts</div>
          <div className={"buttonContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onLoginClick}
              value={"Log in"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
