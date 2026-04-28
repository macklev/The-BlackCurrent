const con = require("./db_connect")

async function createPostTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS posts (
        post_id INT AUTO_INCREMENT,
        user_id INT, 
        post_content VARCHAR(280) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT post_pk PRIMARY KEY (post_id),
        CONSTRAINT post_user_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        ); `

    await con.query(sql)
}


async function getAllPosts() {
    let sql = `
      SELECT * FROM posts;
    `
    return await con.query(sql)
}

module.exports = { getAllPosts }