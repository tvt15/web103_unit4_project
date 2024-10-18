import '../App.css'
import React, { useState } from 'react';
import { createCar } from '../services/CarsAPI';
import '../css/CreateCar.css';

const CreateCar = ({ title }) => {
  const [name, setName] = useState('');
  const [options, setOptions] = useState({
    color: '',
    engine: '',
    interior: '',
    transmission: ''
  });
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { name, options, price };
    await createCar(carData);
    setName('');
    setOptions({
      color: '',
      engine: '',
      interior: '',
      transmission: ''
    });
    setPrice('');
  };

  return (
    <div className="create-car-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="create-car-form">
        <label>
          Car Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Color:
          <input type="text" value={options.color} onChange={(e) => setOptions({ ...options, color: e.target.value })} required />
        </label>
        <label>
          Engine:
          <input type="text" value={options.engine} onChange={(e) => setOptions({ ...options, engine: e.target.value })} required />
        </label>
        <label>
          Interior:
          <input type="text" value={options.interior} onChange={(e) => setOptions({ ...options, interior: e.target.value })} required />
        </label>
        <label>
          Transmission:
          <input type="text" value={options.transmission} onChange={(e) => setOptions({ ...options, transmission: e.target.value })} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
