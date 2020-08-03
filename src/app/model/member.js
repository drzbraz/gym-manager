/* eslint-disable no-throw-literal */
const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all (callback) {
    db.query('SELECT * FROM members', function (err, results) {
      if (err) throw `Database error! ${err}`
      callback(results.rows)
    })
  },
  create (data, callback) {
    const query = `
			INSERT INTO members (
				name,
				avatar_url,
				gender,
				email,
				birth,
				blood,
				weight,
				height
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id
		`
    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      data.email,
      date(data.birth).iso,
      data.birth,
      data.blood,
      data.weigth,
      data.heigth
    ]

    db.query(query, values).then(function (err, results) {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })
  },
  find (id, callback) {
    db.query(`
		SELECT * 
		FROM members
		WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })
  },
  update (id, callback) {
    const query = `
		UPDATE members SET
			avatar_url=($1),
			name=($2),
			birth=($3),
			gender=($4),
			email=($5),
			blood=($6),
			weigth=($7),
			heigth=($8)
		WHERE id = $9
		`
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      data.email,
      data.blood,
      data.weigth,
      data.heigth,
      data.id
    ]

    db.query(query, values, function (err) {
      if (err) throw `Database error! ${err}`
      callback()
    })
  },
  delete (id, callback) {
    db.query('DELETE FROM members WHERE id = $1', [id], function (err) {
      if (err) throw `Database error! ${err}`
      callback()
    })
  }
}
