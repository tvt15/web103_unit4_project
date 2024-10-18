import '../App.css'
import React, { useState, useEffect } from 'react';
import { getCar, updateCar } from '../services/CarsAPI';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EditCar.css';

const EditCar = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [name, setName] = useState('');
  const [options, setOptions] = useState({
    color: '',
    engine: '',
    interior: '',
    transmission: ''
  });
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCar(id);
      setCar(data);
      setName(data.name);
      setOptions(data.options);
      setPrice(data.price);
    };
    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { name, options, price };
    await updateCar(id, carData);
    navigate(`/customcars`);
  };

  const optionList = {
    color: ['Red', 'Blue', 'Green', 'Black', 'White'],
    engine: ['V6', 'V8', 'Electric'],
    interior: ['Leather', 'Cloth'],
    transmission: ['Automatic', 'Manual']
  };

  return car ? (
    <div className="edit-car-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="edit-car-form">
        <label>
          Car Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        {Object.keys(optionList).map((optionKey) => (
          <label key={optionKey}>
            {optionKey.charAt(0).toUpperCase() + optionKey.slice(1)}:
            <select value={options[optionKey]} onChange={(e) => setOptions({ ...options, [optionKey]: e.target.value })}>
              {optionList[optionKey].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <button type="submit">Update Car</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditCar;

