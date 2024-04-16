import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ContactEdit from "./ContactEdit";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("USER", user);
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("http://localhost:4001/account-verify", {
      method: "POST",
      headers: {
        "jwt-token": user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn("success" === r.message);
        setEmail(user.email || "");
      });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/add-contact" element={<ContactEdit />} />
          <Route path="/edit-contact/:id" element={<ContactEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
