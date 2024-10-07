import { useEffect, useState } from "react";
import Error from "./error";
import Loader from "./loader";
import { useLocation, useNavigate } from "react-router-dom";

export default function Menu({
  addCart,
  setAddCart,
  onCart,
  onShowCart,
  showCart,
  onClear,
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://uat.urbansavaari.com:8443/itemsbyrestaurantid",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              restaurant: {
                id: id,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.response);
        for (let i = 0; i < data.response.length; i++) {
          let eachStatus = data.response[i].status;
          if (eachStatus === 0) {
            return;
          } else {
            setItems(data.response);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!id) {
      alert("Please enter the proper ID");
      navigate(-1);
      return;
    }
    fetchData();
  }, [id, navigate]);

  if (items.length === 0 && id !== 1) {
    // alert("Could not find menu for you please enter a proper ID");

    return (
      <p className="wrong--id">
        Could not find food menu please enter a proper ID.
      </p>
    );
  }
  return (
    <div>
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!isLoading && !error && (
        <>
          <h3 className="menu__title">Food Menu</h3>
          <div className="menu__container">
            {items.map((menu, i) => (
              <MenuData
                menu={menu}
                key={i}
                addCart={addCart}
                setAddCart={setAddCart}
                onCart={onCart}
              />
            ))}
          </div>
          <Buttons
            onShowCart={onShowCart}
            onClear={onClear}
            addCart={addCart}
            showCart={showCart}
          />
        </>
      )}
    </div>
  );
}

function Buttons({ onShowCart, onClear, addCart, showCart }) {
  return (
    <div className="btn__container">
      <button className="btn__cart--one" onClick={onShowCart}>
        {showCart ? "Hide Cart" : "Show Cart"}{" "}
        {addCart.length > 0 ? "(" + addCart.length + ")" : ""}
      </button>
      <button className="btn__cart--two" onClick={onClear}>
        Clear Cart
      </button>
    </div>
  );
}

function MenuData({ menu, setAddCart, addCart, onCart }) {
  const [quantity, setQuantity] = useState(1);

  const isAdded = addCart.some((dt) => dt.id === menu.id);

  function handleCart(cart) {
    if (isAdded) {
      alert("Already in the cart");
      return;
    }
    onCart(cart, quantity, menu.id);
  }

  function handleIncQuantity() {
    if (isAdded) {
      alert("This item has already added in the cart");
      return;
    }
    setQuantity((qty) => qty + 1);
  }

  function handleDecQuantity() {
    if (quantity <= 1) return;
    if (isAdded) {
      alert("This item has already added in the cart");
      return;
    }
    setQuantity((qty) => qty - 1);
  }

  // console.log(addCart);

  return (
    <div className="menu">
      <div className="menu__img">
        <img src={menu.image_url} alt={menu.name} />
      </div>

      <div className="menu--food">
        <div className="menu__details">
          <div className="food__price">
            <p className="item__name">{menu.name}</p>
            {/* <p className="item__price">₹{menu.price}</p> */}
            <p>Quantity {quantity}</p>
          </div>

          <div className="quantity">
            {/* <p>Quantity {quantity}</p> */}
            <p className="item__price">₹{menu.price}</p>
            <div>
              <button className="btn__quantity" onClick={handleDecQuantity}>
                -
              </button>{" "}
              :{" "}
              <button className="btn__quantity" onClick={handleIncQuantity}>
                +
              </button>
            </div>
          </div>
        </div>
        <button className="btn__cart" onClick={() => handleCart(menu)}>
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
