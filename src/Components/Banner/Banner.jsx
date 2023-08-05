import React, { useState, useContext } from "react";
import Header from "../header/Header";
import "./Banner.css";
import Search from "./Search";
import { AuthContext } from "../../Context/AuthProvide";

function Banner() {
  const { userToken, userName , userRole } = useContext(AuthContext);

  const name = userName;
  const token = userToken;

  // const [name, setName] = useState("");
  // const [token, setToken] = useState(null);

  // setName(userName);
  // setToken(userToken);

  return (
    <div className="slide1-banner">
      <div className="header">
        <Header />
      </div>
      <div className="title">
        <h1>FIND YOUR CAREER</h1>
        <br />
        <br />
        <h5>
          {userRole}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam officiis
          dignissimos dolore facere delectus similique mollitia ipsa obcaecati
        </h5>
      </div>
      <div className="searchPad">
        <Search />
      </div>
    </div>
  );
}

export default Banner;
