const con = require("./db_connect")

async function createUserTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        handle VARCHAR(255) NOT NULL UNIQUE,
        CONSTRAINT user_pk PRIMARY KEY (user_id)
        ); `

    await con.query(sql)
  }

async function getAllUsers() {
    let sql = `
      SELECT * FROM users;
    `
    return await con.query(sql)
}

module.exports = { getAllUsers }