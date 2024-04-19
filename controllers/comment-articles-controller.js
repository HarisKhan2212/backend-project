const { ArticleIsValid } = require("../models/articles-model")
const { commentsFromArticlesId } = require("../models/comment-articles-model")

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    return Promise.all([commentsFromArticlesId(article_id), ArticleIsValid(article_id)])
    .then(([ comments ]) => {
    res.status(200).send({ comments })
    })
    .catch(next)
}