const db = require('../db/connection');

const selectArticles = (topic) => {
    let sqlQueryString = `
        SELECT  
            a.author,
            a.title,
            a.article_id,
            a.created_at,
            a.votes,
            a.article_img_url,
            a.topic,
            COUNT(c.comment_id) AS comment_count
        FROM articles a 
        LEFT JOIN comments c ON a.article_id = c.article_id 
    `;

    const queryValues = [];

    if (topic) {
        sqlQueryString += `WHERE a.topic = $1 `;
        queryValues.push(topic);
    }

    sqlQueryString += `
        GROUP BY  
            a.author,
            a.title,
            a.article_id,
            a.created_at,
            a.votes,
            a.article_img_url,
            a.topic
        ORDER BY a.created_at DESC;
    `;

    return db.query(sqlQueryString, queryValues)
        .then(({ rows }) => {
            rows.forEach((article) => article.comment_count = parseInt(article.comment_count));
            return rows;
        });
};

const selectArticleById = (article_id) => {
    return db.query(`
        SELECT  
            a.author,
            a.title,
            a.article_id,
            a.created_at,
            a.body,
            a.votes,
            a.article_img_url,
            a.topic,
            COUNT(c.comment_id) :: INT AS comment_count 
        FROM articles a 
        LEFT JOIN comments c ON a.article_id = c.article_id
        WHERE a.article_id = $1
        GROUP BY  
            a.author,
            a.title,
            a.article_id,
            a.created_at,
            a.body,
            a.votes,
            a.article_img_url,
            a.topic;
    `, [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Article not found" });
            }
            return rows[0];
        });
};

const updateVotesByArticleId = (article_id, { inc_votes }) => {
    return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
    `, [inc_votes, article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Article not found" });
            }
            return rows[0];
        });
};

const checkArticleExists = (article_id) => {
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = $1;
    `, [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Article not found" });
            }
            return;
        });
};

module.exports = {
    selectArticles,
    selectArticleById,
    updateVotesByArticleId,
    checkArticleExists
};
