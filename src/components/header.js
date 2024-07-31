export default function Header() {
  return (
    <header className="header">
      <div className="img__container">
        <img
          src={`${process.env.PUBLIC_URL}/Img/pan.png`}
          alt="logo"
          className="logo"
        />
      </div>
      <div className="logo__details">
        <h2 className="logo__title">Advance Software Billing</h2>
        {/* <p>Welcome to New Restaurant</p> */}
      </div>
    </header>
  );
}
