import { useState } from "react";

import "./components/StylesComponent/index.css";

import Header from "./components/header";
import Main from "./components/main";
import Menu from "./components/menu";
import Cart from "./components/cart";

function App() {
  const [addCart, setAddCart] = useState([]);
  const [showCart, setShowCart] = useState(true);

  function handleShowCart() {
    if (addCart.length === 0) {
      alert("Select the cart from menu");
      return;
    }
    setShowCart((show) => !show);
  }

  function handleClearCart() {
    setAddCart([]);
  }

  function handleAddCart(cart, quantity, id) {
    setAddCart((ct) => [...ct, { ...cart, quantity, id }]);
  }

  function handleDeleteCart(id) {
    setAddCart((ct) =>
      ct.filter(function (fil, i) {
        return i !== id;
      })
    );
  }

  return (
    <div className="App">
      <Header />
      <Main>
        <Menu
          setAddCart={setAddCart}
          onCart={handleAddCart}
          addCart={addCart}
          onShowCart={handleShowCart}
          showCart={showCart}
          onClear={handleClearCart}
        />
        {addCart.length !== 0 && showCart && (
          <Cart addCart={addCart} onDelete={handleDeleteCart} />
        )}
      </Main>
    </div>
  );
}

export default App;
