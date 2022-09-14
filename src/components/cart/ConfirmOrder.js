import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state = state.auth));

  // calculate order prices 
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 23
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

  const processToPayment = () => {
    const data = {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice
    }

    sessionStorage.setItem('orderinfo', JSON.stringify(data))
    history.push('/payment')
  }

  return (
    <Fragment>
      <MetaData title={"Confirm Order "}></MetaData>

      <CheckoutSteps shipping ConfirmOrder />

      <div className="roe d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping info</h4>
          <p>
            <b>Name:</b>
            {user && user.name}
          </p>
          <p>
            <b>Phone:</b>
            {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Yo:ur cart items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />

              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2"></div>
                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} * ${item.price} = <b>${(item.quantity  * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal: <span className="Order_Summary_Values">${itemsPrice}</span>
              </p>
              <p>
                Shipping: <span className="Order_Summary_Values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="Order_Summary_Values">${taxPrice}</span>
              </p>
              <hr />
              <p>
                Total: <span className="Order_Summary_Values">${totalPrice}</span>
              </p>
              <hr />
              <button id="checkour_btn" className="btn btn-primary btn-block" onClick={proceesToPayment}>
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
