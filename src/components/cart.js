// import axios from "axios";

export default function Cart({ addCart, onDelete }) {
  let addCartData = addCart;
  let totalPill = addCartData.reduce((acc, food) => {
    return acc + food.price * food.quantity;
  }, 0);
  // let data = {
  //   name: "sherief",
  //   amount: totalPill,
  //   phone: "99999999",
  //   MID: "MID" + Date.now(),
  //   transactionId: "T" + Date.now(),
  // };

  // https://mercury-uat.phonepe.com/transact/simulator?token=2EYozZUFujTRlzl0YoxwUmuXCYHA8boxbHD8CIieR

  // const HandleClick = async () => {
  //   try {
  //     await axios.post("http://localhost:9000/order", data).then((res) => {
  //       console.log("Response:", res.data);
  //       if (res.data.success === true) {
  //         window.location.href =
  //           res.data.data.instrumentResponse.redirectInfo.url;
  //       }
  //     });
  //   } catch (err) {
  //     if (err.response) {
  //       // Server responded with a status other than 2xx
  //       console.error("Error response:", err.response.data);
  //     } else if (err.request) {
  //       // Request was made but no response received
  //       console.error("No response received:", err.request);
  //     } else {
  //       // Something else happened
  //       console.error("Error:", err.message);
  //     }
  //   }
  // };
  const handlePay = async function () {
    try {
      const response = await fetch(
        "https://uat.urbansavaari.com:8443/paymentlink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: `${totalPill}00`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      let url = (window.location.href = data.response);
      console.log(url);

      if (data.success === "SUCCESS") {
        window.location.href = data.response;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Cancle </th>
          </tr>
        </thead>
        <tbody>
          {addCartData.map(function (food, i) {
            let itemTotal = food.price * food.quantity;
            return (
              <tr key={i}>
                <td>{food.name}</td>
                <td>₹{food.price}</td>
                <td>{food.quantity}</td>
                <td>₹{itemTotal}</td>
                <td>
                  <button className="btn__cancle" onClick={() => onDelete(i)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total">
        <p className="total__head">Total Amount : ₹{totalPill}</p>
        <button className="btn__pay" onClick={handlePay}>
          PAY
        </button>
      </div>
    </div>
  );
}
