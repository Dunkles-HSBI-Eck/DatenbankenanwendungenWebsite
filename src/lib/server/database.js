import { Pool } from 'pg';
import { env } from '$env/dynamic/private';
import { DuplicateEmailError, GenricDatabaseError, NoUserFound } from '$lib/server/error.js';

const pool = new Pool({
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    host: env.POSTGRES_IP,
    port: env.POSTGRES_PORT,
    database: env.DATABASE_NAME
});

export async function registerUser(email, hash, salt) {
	try {
		const result = await pool.query('CALL register_user($1, $2, $3, null)', [email, hash, salt]);
		return Number.parseInt(result.rows[0].membership_id_return);
	} catch (error) {
		if (error.message.includes('duplicate email')) {
			throw new DuplicateEmailError();
		}
		console.error('Error registering user:', error);
		throw new GenricDatabaseError('Database error while registering user');
	}
}

export async function getSaltByEmail(email) {
	try {
		const result = await pool.query('CALL get_salt_by_email($1, null)', [email]);
		if (result.rows[0].salt_return === null) {
			throw new NoUserFound('No user found with the provided email');
		}
		return result.rows[0].salt_return;
	} catch (error) {
		if (error instanceof NoUserFound) {
			throw error;
		}
		console.error('Error fetching salt:', error);
		throw new GenricDatabaseError('Database error while fetching salt');
	}
}

export async function verifyUser(email, hash) {
	try {
		const result = await pool.query('CALL verify_user($1, $2, null)', [email, hash]);
		if (result.rows[0].membership_id_return === null) {
			throw new NoUserFound('No user found with the provided credentials');
		}
		return Number.parseInt(result.rows[0].membership_id_return);
	} catch (error) {
		if (error instanceof NoUserFound) {
			throw error;
		}
		console.error('Error verifying user:', error);
		throw new GenricDatabaseError('Database error while verifying user');
	}
}

export async function getMovies(limit, offset) {
    try {
        const result = await pool.query(
            'CALL get_movies($1, $2, null, null)',
            [limit, offset]
        );

        return {
            movies: result.rows[0].movies,
            has_more: result.rows[0].has_more
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new GenricDatabaseError('Database error while fetching movies');
    }
}

export async function getMovieById(movie_id) {
    try {
        const result = await pool.query(
            'CALL get_movie($1, null)',
            [movie_id]
        );
        if (result.rows.length === 0) {
            return null; // No movie found
        }
        return result.rows[0].movie_info;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        throw new GenricDatabaseError('Database error while fetching movie by ID');
    }
}
