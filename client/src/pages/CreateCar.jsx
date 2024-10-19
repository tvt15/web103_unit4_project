import '../App.css'
import '../css/CreateCar.css';
import React, { useState, useEffect } from 'react';
import { createCar } from '../services/CarsAPI';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Error message state
  const [warning, setWarning] = useState(''); // Warning message state

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
    const { name, value } = e.target;
    
    // Check for invalid combination (Electric + Manual)
    if (name === 'transmission' && options.engine === 'Electric' && value === 'Manual') {
      setWarning('Manual transmission is not available for Electric cars.');
    } else if (name === 'engine' && value === 'Electric' && options.transmission === 'Manual') {
      setWarning('Manual transmission is not available for Electric cars.');
    } else {
      setWarning('');  // Clear warning when valid combinations are selected
    }

    setOptions({ ...options, [name]: value });
  };

  // Validation check for invalid combinations
  const validateOptions = () => {
    if (options.engine === 'Electric' && options.transmission === 'Manual') {
      return 'Electric cars cannot have manual transmission.';
    }
    return ''; // No error if valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateOptions();
    if (validationError) {
      setError(validationError); // Set error message if invalid
      return; // Prevent submission
    }
    const newCar = { name, options, price };
    await createCar(newCar);
    navigate('/customcars');
  };

  const isTransmissionDisabled = (transmission) => {
    if (options.engine === 'Electric' && transmission === 'Manual') {
      return true;
    }
    return false;
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
          {warning && <div className="warning-message">{warning}</div>} {/* Show warning if incompatible */}
        </div>

        <div>
          <strong>Total Price: ${price}</strong>
        </div>

        {error && <div className="error-message">{error}</div>} {/* Display error message */}

        <button type='submit' disabled={!!warning}>Create Car</button> {/* Disable submit if warning exists */}
      </form>
    </div>
  );
};

export default CreateCar;
