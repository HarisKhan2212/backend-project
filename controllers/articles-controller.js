// const { articleByArticleId } = require("../models/articles-model")

// exports.getArticleById = (req, res, next) => {
//     const { article_id } = req.params
//     return articleByArticleId(article_id).then((article) => {
//         res.status(200).send({ article })
//     })
//     .catch(next)
// }

// exports.getArticleById = (req, res, next) => {
//     const { article_id } = req.params
//     return articleByArticleId(article_id)
//         .then((article) => {
//             if (!article) {
//                 return res.status(404).send({ msg: 'Article not found' });
//             }
//             res.status(200).send({ article });
//         })
//         .catch(next);
// };
const { selectArticleById } = require("../models/articles-model")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    return selectArticleById(article_id).then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
} 
