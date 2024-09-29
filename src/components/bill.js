import "./StylesComponent/bill.css";

export default function Bill() {
  return (
    <div className="receipt-container">
      <header>
        <h1>Hotel ABC</h1>
        <p>123 Street Name, City</p>
        <p>Phone: (123) 456-7890</p>
        <p>Date: 04 Sep 2024</p>
        <p>Bill No: 676</p>
      </header>

      <section className="bill-info">
        <h2>Bill Receipt</h2>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pasta</td>
              <td>2</td>
              <td>₹12.00</td>
              <td>₹24.00</td>
            </tr>
            <tr>
              <td>Grilled Chicken</td>
              <td>1</td>
              <td>₹15.00</td>
              <td>₹15.00</td>
            </tr>
            <tr>
              <td>Coke</td>
              <td>3</td>
              <td>₹3.00</td>
              <td>₹9.00</td>
            </tr>
            <tr>
              <td>Ice Cream</td>
              <td>2</td>
              <td>₹5.00</td>
              <td>₹10.00</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer>
        <div className="total-cost">
          <p>Subtotal: $58.00</p>
          <p>Tax (10%): $5.80</p>
          <h3>Total: $63.80</h3>
        </div>
        <p>Thank you for dining with us!</p>
      </footer>
    </div>
  );
}
