import { pool } from './database.js'
import './dotenv.js'
import { carData } from '../data/carData.js'

const createCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_items CASCADE;
        DROP TABLE IF EXISTS custom_items CASCADE;

        CREATE TABLE IF NOT EXISTS custom_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        options JSONB,
        price DECIMAL
        );
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 Cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating Cars table', err)
    }
}

const seedCarTable = async () => {
    await createCarTable()

    carData.forEach((car) => {
        const insertQuery = {
            text: 'INSERT INTO custom_cars (name, options, price) VALUES ($1, $2, $3)'
        }

        const values = [
            car.name,
            car.options,
            car.price
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting car', err)
                return
            }
            console.log(`✅ ${car.name} added successfully`)
        })
    })
}
seedCarTable();