import React from "react";
import PropTypes from "prop-types";
import "./Fruit.css";

export default function Fruit(props) {
  return (
    <div className={`fruit ${props.type}`}>
      {props.image?.path && (
        <img
          style={{ width: "20px", height: "20px" }}
          src={`/api/${props.image.path}`}
        />
      )}
      {props.children}
      {props.onDelete && (
        <button onClick={(event) => props.onDelete()}>X</button>
      )}
    </div>
  );
}

Fruit.propTypes = {
  type: PropTypes.oneOf(["apple", "pear", "orange"]).isRequired,
  children: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
