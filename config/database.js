require('dotenv').config()

const dbConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
    seederStorage: 'sequelize',
    pool: {
      max: 20,
      min: 5,
      acquire: 15000,
      idle: 10000
    }
  },
  staging: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    logging: false,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 5000
    }
  },
  loadtest: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    logging: false,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 5000
    }
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    logging: process.env.DATABASE_LOGGING === 'true' ? console.log : false,
    database: 'test_database_name',
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    handleDisconnects: false
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    logging: false,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 5000
    }
  }
}

if (process.env.DATABASE_SSL === 'true') {
  dbConfig[process.env.NODE_ENV].dialectOptions = {
    ssl: { rejectUnauthorized: false }
  }
}

module.exports = dbConfig
