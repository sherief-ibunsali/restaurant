export default function Cart({ addCart, onDelete }) {
  let data = addCart;
  
  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Cancle </th>
          </tr>
        </thead>
        <tbody>
          {data.map(function (food, i) {
            let itemTotal = food.amt * food.quantity;
            return (
              <tr key={i}>
                <td>{food.name}</td>
                <td>₹{itemTotal}</td>
                <td>{food.quantity}</td>
                <td>
                  <button
                    className="btn__cancle"
                    onClick={() => onDelete(i)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
