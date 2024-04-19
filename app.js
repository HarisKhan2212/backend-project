const express = require('express');
const { getTopics } = require('./controllers/topics-controller')
const endPoints = require('./endpoints.json')
const { getArticleById, getArticles } = require('./controllers/articles-controller')
const { getCommentsByArticleId } = require('./controllers/comment-articles-controller')
const app = express();


// endpoints:

app.get('/api', (req, res, next) => {
    res.status(200).send(endPoints)
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

// respond with 404 for any undefined endpoints:
app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found'})
})

// Middleware Error handler 

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request' });
    } else {
        next(err);
    }
});

  // 404 Error handler
  app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
  });
  
  // 500 Error handler
  app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal error' });
  });
module.exports = app