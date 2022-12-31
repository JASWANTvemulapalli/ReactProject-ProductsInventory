import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import inventory from "../Images/Inventory.png";
import {
  getProducts,
  getUsers,
  Get_Products_Action,
  Get_Users_Action,
  Signout_user,
} from "../Store/Actions";
import { Store } from "../Store/Store";

function SignedInNavBar() {
  const userdata = useSelector((udata) => udata.user);
  const name = userdata.First_Name.toUpperCase();
  const dispatch = useDispatch();
  function logOut() {
    if (window.confirm("Are you sure about logging of?")) {
      dispatch(Signout_user());
    }
  }
  return (
    <div>
      <nav className={"navbar navbar-expand-lg navbar-light"}>
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
              <NavLink
                to={"/"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                Home
              </NavLink>
              <NavLink
                to={"/products"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                Products
              </NavLink>
              <NavLink
                to={"/userinfo"}
                exact
                activeClassName="active"
                className="NavLink"
              >
                {name}
              </NavLink>
              <NavLink
                to={"/"}
                exact
                activeClassName="active"
                className="NavLink"
                onClick={logOut}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default SignedInNavBar;
