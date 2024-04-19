const db = require('../db/connection')

exports.commentsFromArticlesId = (article_id) => {
    return db.query(`
        SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC ;`, 
        [article_id])
        .then(({ rows }) => {
        return rows
    })
}

exports.insertComment = (article_id, username, body) => {
    
    return db
    .query(
      'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *',
      [article_id, username, body]
    )
    .then(({rows}) => {
     
      
return rows[0];
    })
}

exports.addCommentToId = (article_id, { username, body }) => {
    return db.query(`
        INSERT INTO comments
        (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *
    ;`, [article_id, username, body])
    .then(({ rows }) => {
        return rows[0]
    })
}

exports.checkUserExists = (username) => {
    if(!username){
        return Promise.reject({ status: 400, msg: "Bad request" })
    } else {
        return db.query(`
            SELECT * FROM users
            WHERE username = $1
            ;`, [username])
        .then(({ rows }) => {
            if (rows.length === 0){
                return Promise.reject({ status: 404, msg: "Username not found" })
            }
            return
        })
    }
}
