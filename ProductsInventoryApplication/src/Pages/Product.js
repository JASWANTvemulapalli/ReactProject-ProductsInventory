import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Product() {
  const location = useLocation();
  const [state, setState] = useState({ product: location.state });

  return (
    <div className="card">
      <h1>Product Details</h1>

      <div className="line">
        <h3>Product NAME</h3>
        <div className="userdetails">{state.product.Product.product_name}</div>
      </div>
      <div className="line">
        <h3>PRODUCT DESCRIPTION</h3>
        <div className="userdetails">
          {state.product.Product.product_description}
        </div>
      </div>
      <div className="line">
        <h3> PRODUCT MANUFACTURER</h3>
        <div className="userdetails">
          {state.product.Product.product_manufacturer}
        </div>
      </div>

      <div className="line">
        <h3>PRODUCT PRICE</h3>
        <div className="userdetails">{state.product.Product.product_price}</div>
      </div>
      <div className="line">
        <h3>PRODUCT QUANTITY</h3>
        <div className="userdetails">{state.product.Product.Quantity}</div>
      </div>
    </div>
  );
}
export default Product;
