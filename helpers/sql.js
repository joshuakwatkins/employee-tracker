const mysql = require('mysql2');
const { identity } = require('rxjs');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'thebestpassword',
      database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
  );

  const allDepts = (id) => {
      db.query(sql, )
  }