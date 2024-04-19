const { ArticleIsValid } = require("../models/articles-model")
const { commentsFromArticlesId, addCommentToId, checkUserExists } = require("../models/comment-articles-model")

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    return Promise.all([commentsFromArticlesId(article_id), ArticleIsValid(article_id)])
    .then(([ comments ]) => {
    res.status(200).send({ comments })
    })
    .catch(next)
}

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const body = req.body;
    const { username } = body;
    
    checkUserExists(username)
        .then(() => {
            return Promise.all([addCommentToId(article_id, body), ArticleIsValid(article_id)])
                .then(([ comment ]) => {
                    res.status(201).send({ comment });
                }) 
        })
        .catch(next);
}
