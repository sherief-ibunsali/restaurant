import { NavLink } from "react-router-dom";
import "./StylesComponent/home.css";
import { useState } from "react";

export default function Home() {
  const [id, setId] = useState("");
  return (
    <div className="entry--page">
      <input
        type="number"
        placeholder="Enter your ID"
        className="id"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button className="btn--nav">
        <NavLink to="foodmenu" className="nav" state={{ id }}>
          Click here to menu
        </NavLink>
      </button>
    </div>
  );
}
