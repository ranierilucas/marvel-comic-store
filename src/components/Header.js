import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';


function Header() {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/"> Marvel Comic Store </Link>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <Link to="/">Comics</Link>
                        </li>

                        <li>
                            <Link to="/checkout" className="btn">Checkout</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </header>
    );
}

export default Header;
