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
        image={fruitData.image}
        onDelete={() => onDelete(fruitData.id)}
      >
        {fruitData.name}
      </Fruit>
    );
  });

  const totals = fruits.reduce((runningTotals, fruit) => {
    return {
      ...runningTotals,
      [fruit.type]: (runningTotals[fruit.type] || 0) + 1,
    };
  }, {});

  return (
    <React.Fragment>
      <AddFruit onFruitAdded={(newFruit) => setFruits([...fruits, newFruit])} />
      <div>
        {Object.keys(totals).map((key) => (
          <span key={key}>
            {key}: {totals[key]}
          </span>
        ))}
      </div>
      <div className="fruits">{fruitElements}</div>
    </React.Fragment>
  );
}
