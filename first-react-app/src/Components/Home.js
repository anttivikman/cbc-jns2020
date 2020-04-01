import React from "react";
import HomerImage from "../resources/images/homer.gif";

export default function Home(props) {
  // HUOM! user JSON objecti tulisi oikeasti jostaan kannasta
  const user = { profileImage: "/api/files/images/kitten.jpg" };
  return (
    <div>
      <div>Tämä on koti</div>
      <div>
        <img src={HomerImage} />
        <div>Static image (esim. logo)</div>
      </div>
      <div>
        <img src={user.profileImage} />
        <div>Dynamic image (esim. käyyttäjän profiili kuva)</div>
      </div>
    </div>
  );
}
