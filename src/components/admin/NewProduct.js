import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors} from '../../actions/productActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const NewProduct =({ history }) => { 

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [cateogry, setCateogry] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const cateogries = [
        "Electronics",
        "Cameras",
        "Mobiles",
        "Laptops",
        "Acccessories",
        "Headphones",
        "Foods",
        "Books",
        "Clothess/shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home"
      ]

      const alert = useAlert();
      const dispatch = useDispatch();
  
      const { loading, error, success} = useSelector(state => state.newProduct);
  
      useEffect(() => {
          
  
          if(error) {
              alert.error(error);
              dispatch(clearErrors())
          }

          if(success) {
            history.push('/admin/products');
            alert.success('product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET})
          }
      }, [dispatch, alert, success, history])

      const submitHandler = (e) => {
        e.preventDefault();
  
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('cateogry', cateogry);
        formData.set('stock', stock);
        formData.set('seller', sellerr);

       images.forEach(image => {
        formData.append('images', image)
       }) 
  
        dispatch(newProduct(formData))
      }
  
      const onChange =e => {

        const files = Array.from(e.target.files)

          files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                setImagesPreview(reader.result)
                setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
         })
     
      }

    return (
        <Fragment>
            <MetaData title={'New product'}></MetaData>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-2">
                <Fragment>
               <div className="wrapper my-5">
                <form className="shadow=lg" encType='multipart/form-data'>
                    <h1 className="mb-4">New product</h1>

                    <div className="form-group">
                        <label for="name_field">Name</label>
                        <input 
                        type="text"
                        id="name_field"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label for="price_field">Price</label>
                        <input 
                        type="text"
                        id="price_field"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label for="description_field">Description</label>
                      <textarea className="form-control" id="description_field"
                       rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>  
                    </div>

                    <div className="form-group">
                        <label for="description_field">Description</label>
                        <select className="form-control" id="cateogry_field" value=
                        {cateogry} onChange={(e) => setCateogry(e.target.value)}>
                        {cateogries.map(cateogry => (
                            <option key={cateogry} value={cateogry}>{cateogry}</option>
                        ))}   
                        </select>
                        </div>

                        <div className="form-group">
                        <label for="stock_field">Stock</label>
                        <input 
                        type="number"
                        id="stock_field"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStoc(e.target.value(e))}
                        />
                    </div>

                    <div className="form-group">
                        <label for="seller_field">Seller</label>
                        <input 
                        type="text"
                        id="seller_field"
                        className="form-control"
                        value={seller}
                        onChange={(e) => setSeller(e.target.value)}
                        />
                    </div>


                    <button 
                    id="login_button"
                    type="'submit"
                    className="btn btn-block py-3"
                    disabled= {loading ? true : false}
                    >

                        CREATE
                    </button>

                </form>
               </div>
    
                </Fragment>
            </div>
        </div>
      </Fragment>
    )

    }
export default NewProduct
    
