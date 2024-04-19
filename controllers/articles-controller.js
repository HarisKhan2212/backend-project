const { selectArticleById, selectArticles, } = require("../models/articles-model")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    return selectArticleById(article_id).then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
} 

exports.getArticles = (req, res, next) => {
    return selectArticles().then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next)
}

// exports.getCommentsByArticleId = (req, res, next) => {
//     const { article_id } = req.params;

//     return Promise.all([selectCommentsByArticleId(article_id), checkArticleExists(article_id)])
//     .then(([ comments ]) => {
//         res.status(200).send({ comments })
//         console.log(comments)
//     })
//     .catch(next)
// }
