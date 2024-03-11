import logo from "./assets/Gems-logo 1.svg";
import icon from "./assets/placeholder-2 1.svg";
export const Nav = () => {
  return (
    <nav className="nav">
      <img src={logo} alt="" />
      <button className="btn-nav">
        <span>
          <img src={icon} alt="" />
        </span>
        Kakkanad
      </button>
    </nav>
  );
};
