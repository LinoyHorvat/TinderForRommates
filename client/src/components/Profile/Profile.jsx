import React from "react";
import "./Profile.css";

function Profile({ user }) {
  const {
    name,
    email,
    profilePicture,
    age,
    gender,
    budget,
    phone,
    description,
  } = user;
  return (
    <>
      <img
        className="profile-picture"
        src={profilePicture}
        alt="Profile pic of the user."
      />
      <div className="profile-details profile-name">{name} ✋</div>
      <div className="profile-details profile-age">{age} years </div>
      <div className="profile-details">{gender}</div>
      <div className="profile-details">{budget}$</div>
      <div className="profile-details">☏ {phone}</div>
      <a href="#" className="profile-details">
        📨 {email}
      </a>
      <div className="profile-details profile-description">"{description}"</div>
    </>
  );
}

export default Profile;
