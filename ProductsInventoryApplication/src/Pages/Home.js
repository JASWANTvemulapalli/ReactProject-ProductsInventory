import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  getUsers,
  Get_Products_Action,
  Get_Users_Action,
  Signout_user,
} from "../Store/Actions";
import { Store } from "../Store/Store";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers((users) => {
      dispatch(Get_Users_Action(users));
    });
    getProducts((products) => {
      dispatch(Get_Products_Action(products));
    });
  }, [Store.getState().change]);
  function print() {
    console.log(Store.getState());
  }

  return (
    <div className="Home">
      <div className="second">
        <h1 className="Heading">About Products Inventory</h1>
        <p className="About">
          Products Inventory Application helps small businesses identify which
          and how much stock available. The practice identifies and responds to
          trends to ensure there’s always enough stock to fulfill customer
          orders and proper warning of a shortage.
        </p>
      </div>
    </div>
  );
}

export default Home;
