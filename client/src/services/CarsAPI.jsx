const API_URL = '/api/items';  // Base URL for the custom items (cars) API

// Fetch all custom cars from the database
export const getAllCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Fetch a single custom car by its ID
export const getCar = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch car');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

// Create a new custom car
export const createCar = async (carData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

// Update an existing custom car by its ID
export const updateCar = async (carId, carData) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error('Failed to update car');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

// Delete a custom car by its ID
export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete car');
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};
