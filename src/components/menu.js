import { useEffect, useState } from "react";
import Error from "./error";
// import Cart from "./cart";

// const menuDetails = [
//   {
//     id: 1,
//     name: "Dosa",
//     amt: "50",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
//   {
//     id: 2,
//     name: "Idly",
//     amt: "30",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
//   {
//     id: 3,
//     name: "Briyani",
//     amt: "300",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
//   {
//     id: 4,
//     name: "Rice",
//     amt: "250",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
//   {
//     id: 5,
//     name: "Noodles",
//     amt: "200",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
//   {
//     id: 6,
//     name: "Pizza",
//     amt: "500",
//     image:
//       "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
//   },
// ];

export default function Menu({ addCart, setAddCart, onCart }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
                id: 1,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.response);
        setItems(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <h1 className="loader">Loading....</h1>;
  if (error) return <Error error={error} />;
  return (
    <div>
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
