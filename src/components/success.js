import "../payment.css";
export function Success() {
  return (
    <div className="success">
      <div className="content">
        <img
          src={`${process.env.PUBLIC_URL}/check.png`}
          alt="Payment Successful"
          className="icon"
        />
        <h1>Payment Successful</h1>
        <p>
          Thank you for your coming ! Your payment has been processed
          successfully.
        </p>
        <div className="order-details">
          <p>
            <strong>Order ID:</strong> 1234567890
          </p>
          <p>
            <strong>Date:</strong> August 16, 2024
          </p>
          <p>
            <strong>Time:</strong> 2:45 PM
          </p>
          <p>
            <strong>Total Amount:</strong> $120.00
          </p>
        </div>
        <a href="/" className="button">
          Return to Home
        </a>
        {/* <a href="/order-details" className="button details">
          View Order Details
        </a> */}
      </div>
    </div>
  );
}
