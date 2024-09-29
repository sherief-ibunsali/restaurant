import React from "react";
import ReactDOM from "react-dom/client";

import RouterReact from "./Nav/Route";
// import { Success } from "./components/success";
// import { Fail } from "./components/fail";
// import Bill from "./components/bill";

function RestaurantApp() {
  return <RouterReact />;
  // return <Bill/>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RestaurantApp />);
