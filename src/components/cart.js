export default function Cart({ addCart, onDelete }) {
  let data = addCart;

  let totalPill = data.reduce((acc, food) => {
    return acc + food.amt * food.quantity;
  }, 0);

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
          {data.map(function (food, i) {
            let itemTotal = food.amt * food.quantity;
            console.log(totalPill);
            return (
              <tr key={i}>
                <td>{food.name}</td>
                <td>₹{food.amt}</td>
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
        <button className="btn__pay">PAY</button>
      </div>
    </div>
  );
}
