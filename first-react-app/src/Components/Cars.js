import React, { useState, useEffect } from "react";

import Car from "./Car";
import AddCar from "./AddCar"; 
import "./Cars.css";

export default function Cars(props) {    
    const [cars, setCars] = useState([]);

    useEffect(() => {
        function fetchData() {
          fetch('/api/cars')
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const onDelete = (id) => {        
        fetch(`/api/cars/${id}`, {
            method: 'DELETE'
        })
        .then(() => setCars(
            cars.filter(car => car.id !== id)
        ));
    }

    const carElements = cars.map(
        carData => {
          return <Car 
            key={carData.id}
            make={carData.make}
            model={carData.model}
            onDelete={() => onDelete(carData.id)}
            />
        }
    )
    
    return (
        <React.Fragment> 
            <AddCar onCarAdded={
                (newCar) => setCars([...cars, newCar])
            }/> 
            <div className="cars">
                {carElements}
            </div>
        </React.Fragment> 
    );
}