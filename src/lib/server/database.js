import { Pool } from "pg";
import {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_IP,
    POSTGRES_PORT,
    DATABASE_NAME
} from '$env/static/private';


const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_IP,
    port: POSTGRES_PORT,
    database: DATABASE_NAME
});

export async function registerUser(email, hash, salt) {
    try {
        await pool.query(
            'CALL register_user($1, $2, $3)',
            [email, hash, salt]
        )
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Database error');
    }
}