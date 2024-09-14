import { useState } from "react";
import "./index.css";
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
          addCart={addCart}
          setAddCart={setAddCart}
          onCart={handleAddCart}
        />
        <div className="btn__container">
          <button className="btn__cart--one" onClick={handleShowCart}>
            {showCart ? "Hide Cart" : "Show Cart"}{" "}
            {addCart.length > 0 ? "(" + addCart.length + ")" : ""}
          </button>
          <button className="btn__cart--two" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
        {addCart.length !== 0 && showCart && (
          <Cart addCart={addCart} onDelete={handleDeleteCart} />
        )}
      </Main>
    </div>
  );
}

export default App;
