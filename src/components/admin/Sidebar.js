import React from "react";
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link href="/dashboard" className="fa fa-tachometer">Dashboard</Link>
                    </li>

                    <li> <Link href="#product submenu" data-togglt="collape" aria-expanded="false" className="dropdown-toggle">
                        <i className="fa fa-product-hunt"></i> Products</Link>
                        <ul className="collapse list-unstyled" id="productsubmenu">
                            <li>
                                <Link href="/admin/products"> <i className="fa fa-clipboard"></i></Link>All
                            </li>
                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i>Create</Link>
                            </li>
                        </ul>
                        </li>

                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </li>

                        <li>
                            <Link href="/admin/users"><i className="fa fa-users"></i> Users</Link>
                        </li>

                        <li>
                            <Link href="/admin/reviews"><i className="fa fa-star"></i> users</Link>
                        </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
