import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
export default function RouterReact() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/foodmenu" element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
