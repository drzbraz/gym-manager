const { Pool } = require('pg')

module.exports = new Pool({
	user: 'postgres',
	password: 'docker',
	host: 'localhost',
	port: 5433,
	database: 'gymmanager'
})
