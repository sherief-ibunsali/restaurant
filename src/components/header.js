import { useEffect, useState } from "react";
export default function Header() {
  const [restaurantName, setRestaurantName] = useState("");
  useEffect(function () {
    async function fetchName() {
      try {
        const response = await fetch(
          "https://uat.urbansavaari.com:8443/restaurantdetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: 1,
            }),
          }
        );
        const data = await response.json();
        setRestaurantName(data.response.name);
      } catch (err) {
        console.log(err);
      }
    }
    fetchName();
  }, []);
  return (
    <header className="header">
      <div className="img__container">
        <img
          src={`${process.env.PUBLIC_URL}/Img/pan.png`}
          alt="logo"
          className="logo"
        />
      </div>
      <div className="logo__details">
        <h2 className="logo__title">Advance Software Billing</h2>
        <h3 className="logo__title" style={{textAlign:"right",marginTop:"5px"}}>{restaurantName}</h3>
        {/* <p>Welcome to New Restaurant</p> */}
      </div>
    </header>
  );
}
