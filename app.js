const express = require('express')
const endpoints = require('./endpoints.json')
const { getTopics } = require('./controllers/topics-controller')
const { getArticleById, getArticles, patchVotesByArticleId } = require('./controllers/articles-controller')
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId } = require('./controllers/comment-articles-controller')
const { getUsers } = require('./controllers/user-controller')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

// Define endpoints
app.get('/api', (req, res) => res.status(200).send(endpoints));
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchVotesByArticleId);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);
app.delete('/api/comments/:comment_id', deleteCommentByCommentId);
app.get('/api/users', getUsers);

// Handle undefined endpoints
app.use((req, res, next) => {
  res.status(404).send({ msg: 'Not found' });
});

// Middleware error handling
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code) {
    if (err.code === '22P02' || err.code === '23502') {
      res.status(400).send({ msg: 'Bad request' });
    } else if (err.code === '23503') {
      res.status(404).send({ msg: 'Article not found' });
    }
  } else {
    next(err);
  }
});

// Default to 500 error for any uncaught errors
app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;