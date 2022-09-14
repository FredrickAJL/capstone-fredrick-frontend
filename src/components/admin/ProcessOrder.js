import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors} from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { updateProduct } from '../../actions/productActions'

const ProcessOrder = () => {

    const [status, setStatus] = useState('');
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus} = order
    const { error, isUpdated} = useSelector(state => state.order)

    const orderId = match.params.id;

    useEffect(() => {

    dispatch(getOrderDetails(orderId))
          
  
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if(isUpdated) {
         alert.success('order updated successfully');
          dispatch({ type: UPDATE_ORDER_RESET})
        }
    }, [dispatch, alert, isUpdated, error, orderId])

    const updateOrderHandler = (id) => {
        
  
        const formData = new FormData();
        formData.set('status', status);
     
        dispatch(updateOrder(id, formData))
      }

      const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, 
      ${shippingInfo.postalCode}, ${shippingInfo.country}`
      const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
  

    return (
        <Fragment>
        <MetaData title={`process order # ${order && order._id}`}></MetaData>
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-2">
            <Fragment>
 <h1 className=""my-5> All orders</h1>

 {loading ? <Loader /> : (
    <><div className="row d-flex justify-content-around">
                                <div className="col-1bcol-lg-7 order-details">

                                    <h1 className="my-5">order # {order && order.id}</h1>

                                    <h4 className="mb-4">shipping info</h4>
                                    <p><b>name:</b>{user && user.name}</p>
                                    <p><b>phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className='mb-4'><b>address:</b>{shippingDetails}</p>
                                    <p><b>amount:</b>${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">payment</h4>
                                    <p className="greencolor"><b>paid</b></p>

                                    <h4 className="my-4">stripe id</h4>
                                    <p className="greencolor"><b>stripe_87655446</b></p>

                                    <h4 className="my-4">order status</h4>
                                    <p className="greencolor"><b>delievered</b></p>

                                    <h4 className="my-4">order items</h4>

                                    <div className="cart-item- my-1">
                                        <div className="row my-5">
                                            <div className="col-4 col-lg-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div><button className="btn btn-primary btn-block" onClick={() => updateOrderHandler}>update button</button></>


    
 )}
            </Fragment>
        </div>
    </div>
  </Fragment>
    )
}

export default ProcessOrder
