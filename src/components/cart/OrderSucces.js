import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData
 from '../layout/MetaData'
const OrderSuccess = () => {
     return (
        <Fragment>  

       <MetaData title={'Order success'}></MetaData>

   <div className="row justify-content-center">
    <div className="col-6 mt-5 text-center">

        <h2>Your order has been placed successfully.</h2>

        <Link to="/orders/me">Go to orders</Link>

    </div>
   </div>
        </Fragment>
     )
}

export default OrderSuccess
