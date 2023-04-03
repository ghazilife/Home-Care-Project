var { Pool } = require('pg');
// const CONNECTION_STRING = 'postgresql://postgres:35089421@localhost:5432/homecare';
   const CONNECTION_STRING = 'postgresql://username:password@localhost:5432/homecare'; //bitte stehen lassen für Johanna

const SSL = process.env.NODE_ENV === 'production';

console.log("test");

class Database {
  constructor () {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING //,
      // fssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });

  }

  query (query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error.' }, null);
        }
        callback({}, res.rows);
      });
    });

  }

  end () {
    this._pool.end();
  }
}

module.exports = new Database();