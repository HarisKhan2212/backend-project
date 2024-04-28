const {
    checkArticleExists
  } = require("../models/articles-model");
  const {
    selectCommentsByArticleId,
    insertCommentByArticleId,
    removeCommentByCommentId
  } = require("../models/comment-articles-model");
  const {
    checkUserExists
  } = require("../models/user-model");
  
  const getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
  
    Promise.all([selectCommentsByArticleId(article_id), checkArticleExists(article_id)])
      .then(([comments]) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  };
  
  const postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const body = req.body;
    const { username } = body;
  
    checkUserExists(username)
      .then(() => {
        Promise.all([insertCommentByArticleId(article_id, body), checkArticleExists(article_id)])
          .then(([comment]) => {
            res.status(201).send({ comment });
          })
          .catch(next);
      })
      .catch(next);
  };
  
  const deleteCommentByCommentId = (req, res, next) => {
    const { comment_id } = req.params;
  
    removeCommentByCommentId(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  };
  
  module.exports = {
    getCommentsByArticleId,
    postCommentByArticleId,
    deleteCommentByCommentId
  };
  