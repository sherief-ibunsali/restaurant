import "../payment.css"
export function Fail(){
    return(
      <div className="fail">
        <div className="fail-content">
            <img   src={`${process.env.PUBLIC_URL}/remove.png`} alt="Payment Failed" className="icon"/>
            <h1 className="fail-head">Payment Failed</h1>
            <p>We're sorry, but your payment could not be processed at this time.</p>
            <p>Please check your payment details and try again.</p>
           <div className="fail--btn__container">
           <a href="/" className="btn-fail">Return to Home</a>
           <a href="/retry-payment" className="btn-fail retry">Retry Payment</a>
           </div>
        </div>
    </div>
    )
}       