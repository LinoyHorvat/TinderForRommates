import React from "react";
import "./Profile.css";

function Room({ room }) {
  const { address, pictures, price, phone, Description } = room;
  return (
    <>
      <img className="profile-picture" src={pictures} />
      <div className="profile-details profile-name">{address} </div>
      <div className="profile-details profile-price">{price}$</div>
      <div className="profile-details">☏ {phone}</div>
      <div className="profile-details profile-description">"{Description}"</div>
    </>
  );
}

export default Room;
