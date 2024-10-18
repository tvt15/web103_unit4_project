import '../App.css'
import React, { useEffect, useState } from 'react';
import { getCar } from '../services/CarsAPI';
import { useParams } from 'react-router-dom';

const CarDetails = ({ title }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id);
        setCar(carData);
      } catch (err) {
        setError('Failed to fetch car details.');
      }
    };
    fetchCar();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  // Safely rendering nested objects such as car.options
  const { name, price, options } = car;

  return (
    <div>
      <h1>{title}</h1>
      <p>Name: {name}</p>
      <p>Price: ${price}</p>
      <h3>Options:</h3>
      {options && (
        <ul>
          <li>Color: {options.color}</li>
          <li>Engine: {options.engine}</li>
          <li>Interior: {options.interior}</li>
          <li>Transmission: {options.transmission}</li>
        </ul>
      )}
    </div>
  );
};

export default CarDetails;
