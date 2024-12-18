import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config();

// Access the variable and log it to the console
//console.log('Environment Variable:', process.env.CONNECTION_URL)

const config = {
    connectionString: process.env.CONNECTION_URL // Use the DATABASE_URL environment variable
 
};

export const pool = new pg.Pool(config);
