import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../actions/userActions";

const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')


    const alert = useAlert();
    const dispatch = useDispatch();
  
    const { isAuthenticated, error, loading } = useSelector(
      (state) => state.auth
    );
  
    useEffect(() => {
      if (isAuthenticated) {
        history.pushState("/");
      }
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, alert, isAuthenticated, error, history])
  
    const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('avatar', avatar);

      dispatch(register(formData))
    }

    const onChange =e => {
        if(e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.om;oad = () => {
                if(reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
    
            setUser({ ...user, [e.target.name]: e.target.value})
        }
    }
  
    return (
       <Fragment>

       <MetaData title={'Register User'}></MetaData>
         
         <div className="row-wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                    <label htmlfor="email_field">Name</label>
                    <input type="name" id="name_field" className="form-control" name="name" value={name} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label htmlfor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    class="form-control"
                    name="email" value={email} onChange={onChange} 
                  />
                </div>

                <div className="form-group">
                  <label htmlfor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    class="form-control"
                    name="password" value={password} onChange={onChange} 
                     />
                </div>
                <button 
                id="register_button"
                type="submit"
                class="btn btn-block py-3"
                disabled={ loading ? true : false }
                >
                    Register

                </button>
                </form>
            </div>
         </div>
       </Fragment>
    )
}

export default Register
