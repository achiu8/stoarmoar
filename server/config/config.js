module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "atlas_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "atlas_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "atlas_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
