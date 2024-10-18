import { pool } from '../config/database.js';
import "../config/dotenv.js"

export const getCustomCars = async (req, res) => {
  const result = await pool.query('SELECT * FROM custom_cars');
  res.json(result.rows);
};

export const getCustomCar = async(req,res)=>{
    const {id} = req.params;
    const result = await pool.query('SELECT * FROM custom_cars WHERE id= $1',[id])
    res.json(result.rows[0])
}

export const createCustomCar = async (req, res) => {
  const { name, options, price } = req.body;
  const result = await pool.query(
    'INSERT INTO custom_cars (name, options, price) VALUES ($1, $2, $3) RETURNING *',
    [name, options, price]
  );
  res.json(result.rows[0]);
};

// Additional CRUD functions: updateCustomItem, deleteCustomItem...
export const updateCustomCar = async (req, res) => {
    const { id } = req.params;
    const { name, options, price } = req.body;
    const result = await pool.query(
        'UPDATE custom_cars SET name = $1, options = $2, price = $3 WHERE id = $4 RETURNING *',
        [name, options, price, id]
    );
    res.json(result.rows[0]);
};

export const deleteCustomCar = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM custom_cars WHERE id = $1', [id]);
    res.json({ message: 'Custom car deleted successfully' });
};
