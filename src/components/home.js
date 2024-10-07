// import { NavLink } from "react-router-dom";
// import "./StylesComponent/home.css";
// import { useState } from "react";

// export default function Home() {
//   const [id, setId] = useState("");
//   return (
//     <div className="entry--page">
//       <input
//         type="number"
//         placeholder="Enter your ID"
//         className="id"
//         value={id}
//         onChange={(e) => setId(Number(e.target.value))}
//       />
//       <button className="btn--nav">
//         <NavLink to="foodmenu" className="nav" state={{ id }}>
//           Click here to menu
//         </NavLink>
//       </button>
//     </div>
//   );
// }

import { NavLink } from "react-router-dom";
import "./StylesComponent/home.css";
import { useState } from "react";

export default function Home() {
  const [id, setId] = useState("");

  return (
    <div className="entry--page">
      <div className="welcome-section">
        <h1 className="restaurant-title">
          Welcome to New Krishna Sagar Restaurant
        </h1>
        <p className="restaurant-description">
          Experience the finest dining with a variety of mouth-watering dishes.
          At Krishna Sagar, we pride ourselves on serving authentic, delicious,
          and fresh meals. Whether you're craving traditional cuisine or
          contemporary flavors, we have something for everyone.
        </p>
      </div>

      <div className="reservation-section">
        <h2 className="reserve--req" style={{ color: "##0A1551" }}>
          Make a Reservation
        </h2>
        <input
          type="number"
          placeholder="Enter your ID"
          className="id"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
        <button className="reservation-btn">
          <NavLink to="foodmenu" className="nav" state={{ id }}>
            View Our Food Menu
          </NavLink>
        </button>
      </div>

      <div className="special-dishes">
        <h2>Our Special Dishes</h2>
        <div className="dish-gallery">
          <div className="dish">
            <img src="https://abs-uat.s3.ap-south-1.amazonaws.com/plain.jpg" alt="Dish 1" />
            <p className="dish-name">Plain Dosa</p>
          </div>
          <div className="dish">
            <img src="https://abs-uat.s3.ap-south-1.amazonaws.com/8ff101f1-3656-48d0-a694-a0af13763a1d.JPG" alt="Dish 2" />
            <p className="dish-name">Patoto Catlet</p>
          </div>
          <div className="dish">
            <img src="https://abs-uat.s3.ap-south-1.amazonaws.com/781606cc-ad51-47c9-bc3c-a25a7cce9250.jpeg" alt="Dish 3" />
            <p className="dish-name">Hyderabadi Biryani</p>
          </div>
        </div>
      </div>
    </div>
  );
}
