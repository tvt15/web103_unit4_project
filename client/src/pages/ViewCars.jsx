import '../App.css'
import React, { useEffect, useState } from 'react';
import { getAllCars, deleteCar } from '../services/CarsAPI';
import { Link } from 'react-router-dom';
import '../css/ViewCars.css';

const ViewCars = ({ title }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getAllCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="view-cars-container">
      <h1>{title}</h1>
      <div className="cars-list">
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <h3>{car.name}</h3>
            <p>Price: ${car.price}</p>
            <p>Color: {car.options.color}</p>
            <p>Engine: {car.options.engine}</p>
            <p>Interior: {car.options.interior}</p>
            <p>Transmission: {car.options.transmission}</p>
            <Link to={`/customcars/${car.id}`} className="view-btn">View</Link>
            <Link to={`/edit/${car.id}`} className="edit-btn">Edit</Link>
            <button onClick={() => handleDelete(car.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
