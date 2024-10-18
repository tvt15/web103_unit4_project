import '../App.css'
import '../css/CreateCar.css';
import React, { useState, useEffect } from 'react';
import { createCar } from '../services/CarsAPI';

const componentPrices = {
  color: { Red: 500, Blue: 400, Black: 450 },
  engine: { 'V6': 2000, 'V8': 3000, 'Electric': 4000 },
  interior: { Leather: 1500, Fabric: 1000, Vinyl: 800 },
  transmission: { Automatic: 1200, Manual: 1000 }
};

const basePrice = 10000; // Base price for the car

const CreateCar = ({ title }) => {
  const [name, setName] = useState('');
  const [options, setOptions] = useState({
    color: 'Red',
    engine: 'V6',
    interior: 'Leather',
    transmission: 'Automatic'
  });
  const [price, setPrice] = useState(basePrice);

  // Calculate total price whenever options change
  useEffect(() => {
    const calculatedPrice = basePrice + 
      componentPrices.color[options.color] +
      componentPrices.engine[options.engine] +
      componentPrices.interior[options.interior] +
      componentPrices.transmission[options.transmission];
    setPrice(calculatedPrice);
  }, [options]);

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = { name, options, price };
    await createCar(newCar);
  };

  return (
    <div className='form-container'>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Color:</label>
          <select name='color' value={options.color} onChange={handleOptionChange}>
            {Object.keys(componentPrices.color).map((color) => (
              <option key={color} value={color}>
                {color} (${componentPrices.color[color]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Engine:</label>
          <select name='engine' value={options.engine} onChange={handleOptionChange}>
            {Object.keys(componentPrices.engine).map((engine) => (
              <option key={engine} value={engine}>
                {engine} (${componentPrices.engine[engine]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Interior:</label>
          <select name='interior' value={options.interior} onChange={handleOptionChange}>
            {Object.keys(componentPrices.interior).map((interior) => (
              <option key={interior} value={interior}>
                {interior} (${componentPrices.interior[interior]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Transmission:</label>
          <select name='transmission' value={options.transmission} onChange={handleOptionChange}>
            {Object.keys(componentPrices.transmission).map((transmission) => (
              <option key={transmission} value={transmission}>
                {transmission} (${componentPrices.transmission[transmission]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <strong>Total Price: ${price}</strong>
        </div>

        <button type='submit'>Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
