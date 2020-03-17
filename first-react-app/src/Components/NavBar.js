import React from "react";
import {Link} from "react-router-dom";

import "./NavBar.css"

export default function NavBar(props) {
    return (
        <div className="nav-bar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/fruits">Fruits</Link>
                </li>
                <li>
                    <Link to="/cars">Cars</Link>
                </li>
                <li>
                    <Link to="/corona">Corona</Link>
                </li>
            </ul>
        </div>
    );
} 