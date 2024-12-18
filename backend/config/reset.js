import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function resetDatabase() {
    try {
        await pool.query('DROP TABLE IF EXISTS your_table_name');
        await pool.query('CREATE TABLE your_table_name (id SERIAL PRIMARY KEY, name TEXT)');
        console.log('Database reset complete.');
    } catch (err) {
        console.error('Error resetting database:', err);
    } finally {
        await pool.end();
    }
}

resetDatabase();
