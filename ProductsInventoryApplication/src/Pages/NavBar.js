import { NavLink } from "react-router-dom";
import inventory from "../Images/Inventory.png";

function NavBar() {
  return (
    <div>
      <nav className={"navbar navbar-expand-lg navbar-light "}>
        <div className="container-fluid">
          <img src={inventory} height="40" alt="CoolBrand" />
          <h2 className="HeadingNavBar">Products Inventory</h2>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <a href="/" className="NavLink">
                Home
              </a>
              <NavLink
                to={"/products"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                Products
              </NavLink>
              <NavLink
                to={"/register"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                Register
              </NavLink>
              <NavLink
                to={"/signin"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                SignIn
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
