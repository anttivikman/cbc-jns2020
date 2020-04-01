import React from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import "./NavBar.css";

export default function NavBar(props) {
  const history = useHistory();
  const currentPath = history.location.pathname;

  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to="/" className={classNames({ active: currentPath === "/" })}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/fruits"
            className={classNames({
              active: currentPath.startsWith("/fruits"),
            })}
          >
            Fruits
          </Link>
        </li>
        <li>
          <Link
            to="/cars"
            className={classNames({ active: currentPath.startsWith("/cars") })}
          >
            Cars
          </Link>
        </li>
        <li>
          <Link
            to="/corona"
            className={classNames({
              active: currentPath.startsWith("/corona"),
            })}
          >
            Corona
          </Link>
        </li>
      </ul>
    </div>
  );
}
