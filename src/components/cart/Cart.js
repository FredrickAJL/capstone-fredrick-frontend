import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {

        const newQty =  quantity + 1;
       
        if(newQty > stock) return;
       
       dispatch(addItemToCart(id, newQty))
       
          }
       
         const decreaseQty = (id, quantity) => {
       
           const newQty = quantity - 1;
       
           if(newQty <= 0 ) return;
          
           dispatch(addItemToCart(id, newQty))

         }

         const checkoutHandler = () => {
            history.push('/login?redirect=shipping')
         }


 return (
    <Fragment>
        <MetaData title={'your cart'}></MetaData>
        {cartItems.length === 0 ? <h2 className="mt-5">Your cart is empty</h2> : (
   <Fragment>
   <h2 className="mt-5">Your cart: <b>{cartItems.length} items</b></h2>

   <div className="row d-flex justify-content-between"></div>
    <div className="col-12 col-lg-8 "></div>
    <hr />

 {cartItems.map(item => {
    <Fragment>
        <hr/>
  
        <div className="cart-item" key={item.product}>
        <div className="row">
            <div className="col-4 col-lg-3">

                <div className="col-5 col-lg-3">
                    <Link to="#"> HP 15</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">${item.price}</p>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                        <inpur type="number" className="form-control count d-inline" value={item.quantity} readonly />
                    </div>
                    <span className="btn btn-primary plus"  onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                </div>
            </div>

            <div className="col-4 cpl-lg-1 mt-4 mt-lg-0">
                <i id="delete-cart-items" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler (item.product)}></i>
            </div>
        </div>
    </div>
    <hr />
   

    </Fragment>
 })}

   <div className="col-12 col-lg-3 my-4">
    <div id="order_summary">
        <h4 Order summary></h4>
        <hr />
        <p> Sub total: <span className="order-summary-value">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (units)</span></p>
        <p>Est.total: <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}6</span></p>
        <hr />
        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
    </div>
   </div>

   </Fragment>
)} 
    </Fragment>
     
 )
}

export default Cart
