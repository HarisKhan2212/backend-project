const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller')
const endPoints = require('./endpoints.json')

app.get('/api/topics', getTopics);
  
app.get("/api", (req, res) => {
    res.status(200).send(endPoints);
  });

  // 404 Error handler
  app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
  });
  
  // 500 Error handler
  app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal error' });
  });
  
  module.exports = app;