import { useState } from "react";
// import Cart from "./cart";

const menuDetails = [
  {
    id: 1,
    name: "Dosa",
    amt: "50",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
  {
    id: 2,
    name: "Idly",
    amt: "30",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
  {
    id: 3,
    name: "Briyani",
    amt: "300",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
  {
    id: 4,
    name: "Rice",
    amt: "250",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
  {
    id: 5,
    name: "Noodles",
    amt: "200",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
  {
    id: 6,
    name: "Pizza",
    amt: "500",
    image:
      "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
  },
];

export default function Menu({ addCart, setAddCart, onCart }) {
  return (
    <div>
      <h3 className="menu__title">Food Menu</h3>
      <div className="menu__container">
        {menuDetails.map((menu, i) => (
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
  // const [addCart, setAddCart] = useState([]);

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
        <img src={menu.image} alt={menu.name} />
      </div>

      <div className="menu--food">
        <div className="menu__details">
          <div className="food__price">
            <p className="item__name">{menu.name}</p>
            <p className="item__price">₹{menu.amt}</p>
          </div>

          <div className="quantity">
            <p>Quantity {quantity}</p>
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
