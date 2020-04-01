import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Car from "./Car";
import AddCar from "./AddCar";
import "./Cars.css";

const PAGE_SIZE = 2;

export default function Cars(props) {
  const [page, setPage] = useState(0);
  const [carsCount, setCarsCount] = useState(0);
  const [cars, setCars] = useState([]);

  function fetchData() {
    fetch("/api/cars/count")
      .then(res => res.json())
      .then(data => setCarsCount(data.count))
      .catch(err => console.log(err));
    fetch(`/api/cars?offset=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const onDelete = id => {
    fetch(`/api/cars/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetchData();
    });
  };

  const onCarAdded = newCar => {
    fetchData();
  };

  const carElements = cars.map(carData => {
    return (
      <Car
        key={carData.id}
        make={carData.make}
        model={carData.model}
        onDelete={() => onDelete(carData.id)}
      />
    );
  });

  return (
    <React.Fragment>
      <AddCar onCarAdded={newCar => onCarAdded(newCar)} />
      <ReactPaginate
        containerClassName="pagination"
        pageCount={Math.ceil(carsCount / PAGE_SIZE)}
        initialPage={page}
        onPageChange={event => setPage(event.selected)}
      />
      <div className="cars">{carElements}</div>
    </React.Fragment>
  );
}
