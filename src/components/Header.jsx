import { BsFillEyeFill } from "react-icons/bs";

function Header() {
  return (
    <header>
      <div className="site--logo" to="/">
        W
        <span className="site--icon">
          <BsFillEyeFill />
        </span>
        tcher
      </div>
    </header>
  );
}

export default Header;
