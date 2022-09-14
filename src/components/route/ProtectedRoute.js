import React, { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: component, ...rest }) => {

  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);
 
  return (
    <Fragment>
      {loading === false && (
        <Route 
        {...rest}
        render={props =>{
          if (isAuthenticated === false) {
            return <Redirect to='/login' />
          }
          if(isAdmin === true && user.role !== 'admin') {
            return <Redirect to='/' />
          }
          return <Component {...props} />
        }}
        ></Route>
      )}
    </Fragment>
  )

  
};

export default ProtectedRoute;
