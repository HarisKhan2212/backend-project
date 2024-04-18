const { selectTopics } = require("../models/topics-model");

exports.getTopics = (req, res) => {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

//req.params
// pass article ID 
// pass it into fetch articleID
// so model can grab and use in query 
// avoid sql injection $1 brackets after with article id
// 