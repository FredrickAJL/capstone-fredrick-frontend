import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = ({ match}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid = paymentInfo && paymentInfo.status === 'succeded' ? true : false
  return (
    <Fragment>
      <MetaData title={"order details"}></MetaData>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between"> </div>
          <div className="col-12 col-lg-8 mt-5">
            order details
            <h1 className="my-5">Order # {order.id}</h1>
            <h4 className="mb-4">Shipping</h4>
            <p>
              <b>Name:</b>
              {user && user.name}
            </p>
            <p>
              <b>Phone:</b>
              {shippingInfo && shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>
              {shippingDetails}
            </p>
            <p>
              <b>Amount:</b>${totalPrice}
            </p>
            <hr />
            <h4 className="my-4">Payment</h4>
            <p className={isPaid ? "greenColor" : "redColor"}>
              <b>{ispaid ? "Paid" : "notPaid"}</b>
            </p>
            <h4 className="my-4">order status:</h4>
            <p
              className={
                order.orderStaus &&
                String(order.orderStaus).includes("Delivered")
                  ? "greenColor"
                  : "redColor"
              }
            >
              <b>{orderStatus}</b>
            </p>
            <h4 className="my-4">Order Items</h4>
            <hr />
            <div className="cart-item- my-1">
              {orderItems &&
                orderItems.map((item) => (
                  <div key={item.product} className="row my-5">
                    <div className="col-4 col-lg-2"></div>

                    <div className="col-5 cl-mg-5">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-5 col-mg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>
                    <div className="col-4 col-lg-5 mt-4 mt-lg-0">
                      <p>{item.quantity}pieces(s)</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
