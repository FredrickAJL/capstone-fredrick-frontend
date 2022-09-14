import React, { Fragment, useState, useEffect } from 'react'
import {  MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, clearErrors, deleteReview} from '../../actions/productActions'
 import { DELETE_REVIEW_RESET} from '../../constants/productConstants'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, reviews } = useSelector(state => state.ProductReviews); 
    const { isDeleted } = useSelector(state => state.review)

    

    useEffect(() => {
        

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }
  
        if(productId !== '') {
            dispatch(getProductReviews(productId))
           }
     

      if (isDeleted) {
      alert.success('review deleted successfully');
    dispatch: ({ type: DELETE_REVIEW_RESET })
    }

 

    }, [dispatch, alert, error, productId, isDeleted ])

   const deleteReviewHandler =(id) => {
       dispatch(deleteReview(id, productId))
    }

   const submitHandlern= (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId))
   }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'review ID',
                    field: 'id',
                    sort: 'asc' 
                },
                {
                    label: 'Ratinh',
                    field: 'rting',
                    sort: 'asc' 
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
               
                actions:
                <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=> deleteReviewHandler(review._id)}>
                <i className="fa fa-trash"></i>
                </button>
               
            })
        });

        return data;
    }


    return (
        <Fragment>
        <MetaData title={'Product Reviews'}></MetaData>
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>


        <div className="col-12 col-md-2">
            <Fragment>
            <div className="row justify content-center mt-5">
    <div className="col-5">
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="product_field">Enter Product id</label>
                <input
                type="text"
                id="product_field"
                className="form_contro"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                />
            </div>

            <button 
            id="search_button"
            type="submit"
            className="btn btn-primary btn btn-block"
            >

                SEARCH
            </button>
        </form>
    </div>
</div>


   {reviews && reviews.length > 0 ? (
      
        <MDBDataTable
        data={setReviews()}
        className="px-3"
        bordered
        striped
        hover
        />
     
   ): (
    <p className="mt-5 text-center"> no reviews</p>
   )}

            </Fragment>
        </div>
    </div>
  </Fragment>
    )
}

export default ProductReviews
