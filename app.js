const express = require('express');
const { getTopics } = require('./controllers/topics-controller')
const endPoints = require('./endpoints.json')
const { getArticleById, getArticles } = require('./controllers/articles-controller')
const app = express();


// endpoints:

app.get('/api', (req, res, next) => res.status(200).send(endPoints))

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)


// respond with 404 for any undefined endpoints:
app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found'})
})

// middleware err handling 

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    next(err)
})

app.use((err, req, res, next) => {
    if(err.code) {
        if(err.code === '22P02') {
            res.status(400).send({ msg: 'Bad request'})
      }
    }
    next(err)
  })
// default to 500 error for any uncaught errors:
app.use((err, req, res, next) => {
    //console.log(err, '<-- err at end')
    res.status(500).send({ msg: 'Internal server error'})
})

module.exports = app