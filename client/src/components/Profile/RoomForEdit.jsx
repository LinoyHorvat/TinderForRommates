import React, { useState, useEffect } from "react";
import "./Profile.css";
import myApi from "../../api/Api";

function RoomForEdit({ room }) {
  const { address, pictures, price, phone, Description } = room;

  const [newPrice, setNewPrice] = useState(price);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  const [newDescription, setNewDescription] = useState(Description);
  const [imgURL, setImgURL] = useState(pictures);

  const [currUser, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async (_id) => {
    setLoading(true);
    try {
      const { data } = await myApi.get(`/users/${_id}`);
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.userInfo) {
      const lsData = JSON.parse(localStorage.getItem("userInfo"));
      getUser(lsData.user._id);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await myApi.put(`/rooms/${room._id}`, {
        pictures: imgURL,
        price: newPrice,
        address: newAddress,
        phone: newPhone,
        description: newDescription,
      });
      getUser(currUser._id);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  const showRoom = (room) => {
    return (
      <div className="profile-box">
        <img className="profile-picture" src={pictures} />
        <input
          placeholder="Enter img URL"
          onChange={(e) => {
            setImgURL(e.target.value);
          }}
        ></input>
        <div className="profile-details profile-name">{address} </div>
        <div className="profile-details profile-price">
          Price:
          <input
            placeholder={price}
            onChange={(e) => {
              setNewPrice(e.target.value);
            }}
          ></input>
        </div>
        <div className="profile-details">
          Phone:
          <input
            placeholder={phone}
            onChange={(e) => {
              setNewPhone(e.target.value);
            }}
          ></input>
        </div>
        <div className="profile-details profile-description">
          <textarea
            cols="3vh"
            rows="9"
            placeholder={Description}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };

  return <div>{currUser && showRoom(room)}</div>;
}

export default RoomForEdit;
