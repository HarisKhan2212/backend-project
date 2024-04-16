const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller')

app.get('/api/topics', getTopics);
  
  // 404 Error handler
  app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
  });
  
  // 500 Error handler
  app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal error' });
  });
  
  module.exports = app;