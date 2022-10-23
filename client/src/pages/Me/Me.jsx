import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import Room from "../../components/Profile/Room";
import ProfileForEdit from "../../components/Profile/ProfileForEdit";
import RoomForEdit from "../../components/Profile/RoomForEdit";
import myApi from "../../api/Api";
import "../../components/Profile/Profile.css";

function Me() {
  const [favoritesProfiles, setFavoritesProfiles] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [favoritesApartments, setFavoritesApartments] = useState([]);

  const getUser = async (_id) => {
    setLoadingProfile(true);
    try {
      const { data } = await myApi.get(`/users/${_id}`);
      setCurrUser(data);
      setLoadingProfile(false);
      getAllFavoritesApartments(data);
      getAllFavoritesProfiles(data);
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

  const getAllFavoritesProfiles = async (currUser) => {
    const newFavoritesProfiles = [];
    await currUser.myFavoritesProfiles.map(async (profile_id) => {
      try {
        const { data } = await myApi.get(`/users/${profile_id}`);
        newFavoritesProfiles.push(data);
        setFavoritesProfiles(newFavoritesProfiles);
        if (
          newFavoritesProfiles.length === currUser.myFavoritesProfiles.length
        ) {
          setLoadingProfile(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
    });
  };

  const showFavoritesProfiles = () => {
    return favoritesProfiles.map((profile) => {
      return (
        <div key={profile._id} className="profile-box">
          <Profile user={profile} />
          <button
            onClick={() => {
              removeFromMyFavoritesProfiles(profile._id);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  const removeFromMyFavoritesProfiles = async (_id) => {
    try {
      const { data } = await myApi.put(
        `/users/deleteFavoritesProfiles/${currUser._id}`,
        { _id }
      );
      getUser(currUser._id);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  const getAllFavoritesApartments = async (currUser) => {
    const newFavoritesApartments = [];
    await currUser.myFavoritesApartments.map(async (room_id) => {
      try {
        const { data } = await myApi.get(`/rooms/${room_id}`);
        newFavoritesApartments.push(data);
        setFavoritesApartments(newFavoritesApartments);
        if (
          newFavoritesApartments.length ===
          currUser.myFavoritesApartments.length
        ) {
          setLoadingRoom(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
    });
  };

  const showFavoritesApartments = () => {
    return favoritesApartments.map((room) => {
      return (
        <div key={room._id} className="profile-box">
          <Room room={room} />
          <button
            onClick={() => {
              removeFromFavoritesApartments(room._id);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  const removeFromFavoritesApartments = async (_id) => {
    try {
      const { data } = await myApi.put(
        `/users/deleteFavoritesApartments/${currUser._id}`,
        { _id }
      );
      getUser(currUser._id);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };
  return (
    <div className="Me">
      <h1>My Profile</h1>
      {currUser ? <ProfileForEdit user={currUser} /> : <div>loading...</div>}
      <h1>My Favorites Profiles</h1>
      <div className="profiles-container">
        {loadingProfile ? (
          showFavoritesProfiles()
        ) : (
          <div>You haven't added any favorites profiles...</div>
        )}
      </div>
      <h1>My Favorites Apartments</h1>
      <div className="profiles-container">
        {loadingRoom ? (
          showFavoritesApartments()
        ) : (
          <div>You haven't added any favorites apartments...</div>
        )}
      </div>
      <h1>My Apartment</h1>
      <div>You haven't add an apartment...</div>
    </div>
  );
}

export default Me;
