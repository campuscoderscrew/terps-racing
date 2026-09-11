import React from "react";
import { Link } from "react-router-dom";
import NavBar from "~/components/navbar";

// TODO: Take in a param to distinguish between different committees
export default function Committees() {
  return (
    <div className="">
      <NavBar />
      Committees Boilerplate
      <br />
      <Link to="/committeepage">Gifting Gala Committee Link</Link>
    </div>
  );
}
