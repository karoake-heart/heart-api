let DB_URL = process.env.HEART_DATABASE_URL + '?ssl=true';
import massive from 'massive';
export default massive({connectionString : DB_URL});