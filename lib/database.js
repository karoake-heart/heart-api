let DB_URL = process.env.DATABASE_URL;
import massive from 'massive';
export default massive({connectionString : DB_URL});