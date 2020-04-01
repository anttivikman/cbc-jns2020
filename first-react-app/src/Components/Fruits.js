import React, { useState, useEffect } from "react";

import Fruit from "./Fruit";
import AddFruit from "./AddFruit";
import "./Fruits.css";

export default function Fruits(props) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch("/api/fruits")
        .then((res) => res.json())
        .then((data) => setFruits(data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  const onDelete = (id) => {
    fetch(`/api/fruits/${id}`, {
      method: "DELETE",
    }).then(() => setFruits(fruits.filter((fruit) => fruit.id !== id)));
  };

  const fruitElements = fruits.map((fruitData) => {
    return (
      <Fruit
        key={fruitData.id}
        type={fruitData.type}
        onDelete={() => onDelete(fruitData.id)}
      >
        {fruitData.name}
      </Fruit>
    );
  });

  return (
    <React.Fragment>
      <AddFruit onFruitAdded={(newFruit) => setFruits([...fruits, newFruit])} />
      <div className="fruits">{fruitElements}</div>
    </React.Fragment>
  );
}
