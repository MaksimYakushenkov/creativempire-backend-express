const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, getArticle, createArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getArticles);
router.get('/articles/:articleUrl', celebrate({
  params: Joi.object().keys({
    articleUrl: Joi.string().required(),
  }),
}), getArticle);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    preview: Joi.string().required(),
    url: Joi.string().required(),
    tags: Joi.array().required(),
    htmlCode: Joi.string().required(),
    metaTitle: Joi.string().required(),
    metaDescription: Joi.string().required(),
  }),
}), createArticle);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteArticle);

module.exports = router;
