import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactEdit = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    lat: "",
    lon: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = JSON.parse(localStorage.getItem("user"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    "jwt-token": token,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    async function fetchContact() {
      try {
        const result = await fetch(`http://localhost:4000/contacts/${id}`, {
          headers,
        }).j;
        const res = await result.json();
        setContact(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      fetchContact();
    }
  }, [headers, id, setContact]);

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setContact({ ...contact, [name]: value });
  };

  const handleUpdateSubmit = async (ev) => {
    ev.preventDefault();
    try {
      let res;
      if (id) {
        res = await fetch(`http://localhost:4000/contacts/${id}`, {
          method: "PUT",
          body: JSON.stringify(contact),
          headers,
        });
      } else {
        res = await fetch(`http://localhost:4000/contacts`, {
          method: "POST",
          body: JSON.stringify(contact),
          headers,
        });
      }
      res = res.json();
      setContact(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (ev) => {
    if (id) {
      await fetch(`http://localhost:4000/contacts/${id}`, {
        method: "DELETE",
        headers,
      });
      navigate("/");
    }
  };

  const { firstName, lastName, phone, address, lat, lon, description } =
    contact || {};

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h3>Update Contact</h3>
          <div className="mb-2">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="form-control"
              defaultValue={firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Enter last name"
              className="form-control"
              defaultValue={lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone Number</label>
            <input
              name="phone"
              type="tel"
              placeholder="3491231231"
              pattern="[0-9]{10}"
              required
              className="form-control"
              defaultValue={phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control"
              defaultValue={address}
              name="address"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Latitude</label>
            <input
              type="text"
              placeholder="Enter Latitude"
              className="form-control"
              name="lat"
              defaultValue={lat}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Longitude</label>
            <input
              type="text"
              placeholder="Enter Longitude"
              className="form-control"
              name="lon"
              defaultValue={lon}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="Enter descrption"
              className="form-control"
              name="description"
              defaultValue={description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              style={{ "margin-right": "10px" }}
              onClick={(e) => handleUpdateSubmit(e)}
              className="btn btn-success"
            >
              Save
            </button>
            <button
              onClick={(e) => handleDeleteSubmit(e)}
              className="btn btn-success"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactEdit;
