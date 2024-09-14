import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Click below to get the food menu</h2>
      <NavLink to="foodmenu" style={{ textDecoration: "none" }}>
        <button>Go to menu</button>
      </NavLink>
    </div>
  );
}
