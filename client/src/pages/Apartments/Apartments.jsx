import myApi from "../../api/Api";
import React, { useState, useEffect } from "react";
import Room from "../../components/Profile/Room.jsx";
import "../../components/Profile/Profile.css";

function Apartments() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState(null);

  const getAllRooms = async () => {
    setLoading(true);
    try {
      const { data } = await myApi.get("/rooms/");
      setRoomData(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  const getUser = async (_id) => {
    setLoading(true);
    try {
      const { data } = await myApi.get(`/users/${_id}`);
      setCurrUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };
  useEffect(() => {
    getAllRooms();
    if (localStorage.userInfo) {
      const lsData = JSON.parse(localStorage.getItem("userInfo"));
      getUser(lsData.user._id);
    }
  }, []);

  const showRooms = () => {
    return roomData.map((room) => {
      return (
        <div key={room._id} className="profile-box">
          <Room room={room} />{" "}
          <button
            className="profile-btn"
            onClick={() => {
              addRoomToMyFavorites(room._id);
            }}
          >
            Like{" "}
          </button>{" "}
        </div>
      );
    });
  };

  const addRoomToMyFavorites = async (_id) => {
    try {
      const { data } = await myApi.put(
        `/users/favoritesApartments/${currUser._id}`,
        { _id }
      );
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="profiles-page-container">
      <h1> Find your Room </h1>{" "}
      <div className="profiles-container"> {roomData && showRooms()} </div>{" "}
    </div>
  );
}

export default Apartments;
