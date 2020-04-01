import React from "react";
import "./Car.css";

export default function Car(props) {
  return <div className={`car ${props.make}`}>{props.model}</div>;
}
