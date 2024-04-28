const {
    selectArticleById,
    selectArticles,
    updateVotesByArticleId,
    checkArticleExists
  } = require("../models/articles-model");
  const { checkTopicExists } = require("../models/topics-model");
  
  const getArticles = async (req, res, next) => {
    try {
      const { topic } = req.query;
      const [articles] = await Promise.all([
        selectArticles(topic),
        checkTopicExists(topic)
      ]);
      res.status(200).send({ articles });
    } catch (error) {
      next(error);
    }
  };
  
  const getArticleById = async (req, res, next) => {
    try {
      const { article_id } = req.params;
      const article = await selectArticleById(article_id);
      res.status(200).send({ article });
    } catch (error) {
      next(error);
    }
  };
  
  const patchVotesByArticleId = async (req, res, next) => {
    try {
      const { article_id } = req.params;
      const body = req.body;
      const article = await updateVotesByArticleId(article_id, body);
      res.status(200).send({ article });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getArticles,
    getArticleById,
    patchVotesByArticleId
  };
  