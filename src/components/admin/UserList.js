import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors} from '../../actions/userActions'
import { DELETE_USER_RESET} from '../../constants/productConstants'

const UserList = ({ history }) => {
      
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users} = useSelector(state => state.allUsers); 
    const { isDeleted } = useSelector(state => state.user)
    

    useEffect(() => {
        dispatch(allUsers());

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

     

       if (isDeleted) {
      alert.success('user deleted successfully');
     history.push('/admin/users');
    dispatch: ({ type: DELETE_USER_RESET })
    }

    }, [dispatch, alert, error, isDeleted, history])

   const deleteuserHandler =(id) => {
       dispatch(deleteuser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'user ID',
                    field: 'id',
                    sort: 'asc' 
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc' 
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
               
                actions:
                <Fragment>
                <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2"> 
                <i className="fa fa-pencil"></i>
                </Link>
                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => 
                deleteUserHandler(user._id)} >
                <i className="fa fa-trash"></i>
                </button>
                </Fragment>
            })
        });

        return data;
    }


    return (
        <Fragment>
        <MetaData title={'All Users'}></MetaData>
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-2">
            <Fragment>
 <h1 className=""my-5> All users</h1>

 {loading ? <Loader /> : (
    <MDBDataTable
    data={setUsers()}
    className="px-3"
    bordered
    striped
    hover
    />
 )}
            </Fragment>
        </div>
    </div>
  </Fragment>
    )
}

export default UserList
