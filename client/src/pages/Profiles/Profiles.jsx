import myApi from "../../api/Api";
import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import "../../components/Profile/Profile.css";

function Profiles() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState(null);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await myApi.get("/users/");
      setUsersData(data);
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
    getAllUsers();
    if (localStorage.userInfo) {
      const lsData = JSON.parse(localStorage.getItem("userInfo"));
      getUser(lsData.user._id);
    }
  }, []);

  const showUsers = () => {
    return usersData.map((user) => {
      if (user._id !== currUser._id) {
        return (
          <div key={user._id} className="profile-box">
            <Profile user={user} />
            <button
              className="profile-btn"
              onClick={() => {
                addProfileToMyFavoritesProfiles(user._id);
              }}
            >
              Like
            </button>
          </div>
        );
      }
    });
  };

  const addProfileToMyFavoritesProfiles = async (_id) => {
    try {
      const { data } = await myApi.put(
        `/users/favoritesProfiles/${currUser._id}`,
        { _id }
      );
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="profiles-page-container">
      <h1>Find your roommates</h1>
      <div className="profiles-container"> {currUser && showUsers()}</div>
    </div>
  );
}

export default Profiles;
