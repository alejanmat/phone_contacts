import axios from "axios";
import React, { useState } from "react";

const Search = (props) => {
  const { handleResult } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async () => {
    try {
      let res;
      const { token } = JSON.parse(localStorage.getItem("user"));
      if (searchQuery) {
        res = await axios.get(
          `http://localhost:4000/search?query=${searchQuery}`,
          {
            headers: {
              "jwt-token": token,
            },
          }
        );
        handleResult(res.data || []);
      } else {
        res = await axios.get(`http://localhost:4000/contacts`, {
          headers: {
            "jwt-token": token,
          },
        });
        handleResult(res?.data?.contacts);
      }
    } catch (error) {
      console.error("Error during search", error);
    }
  };

  return (
    <div className="d-flex">
      <input
        className="form-control"
        type="text"
        placeholder="find a contact"
        onChange={(ev) => setSearchQuery(ev.target.value)}
      />
      <button onClick={handleSearchSubmit} className="btn btn-success">
        Search
      </button>
    </div>
  );
};

export default Search;
