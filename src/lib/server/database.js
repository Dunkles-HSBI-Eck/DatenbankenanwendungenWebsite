import { Pool } from "pg";
import {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_IP,
    POSTGRES_PORT,
    DATABASE_NAME
} from '$env/static/private';
import { GenricDatabaseError, NoUserFound } from "$lib/server/error.js";


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
        throw new GenricDatabaseError('Database error while registering user');
    }
}

export async function getSaltByEmail(email) {
    try {
        const result = await pool.query(
            'CALL get_salt_by_email($1)',
            [email]
        );
        if (result.rows.length === 0) {
            throw new NoUserFound('No user found with the provided email');
        }
        return result.rows[0].salt;
    } catch (error) {
        console.error('Error fetching salt:', error);
        throw new GenricDatabaseError('Database error while fetching salt');
    }
}

export async function verifyUser(email, hash) {
    try {
        const result = await pool.query(
            'CALL verify_user($1, $2)',
            [email, hash]
        );
        if (result.rows.length === 0) {
            throw new NoUserFound('No user found with the provided credentials');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error verifying user:', error);
        throw new GenricDatabaseError('Database error while verifying user');
    }
}