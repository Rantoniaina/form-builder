const { Pool } = require('pg');

exports.pgConnect = () => {
  let pool;
  if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  } else {
    pool = new Pool();
  }
  return pool;
};
