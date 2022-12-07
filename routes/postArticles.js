const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createArticle, deleteArticle, updateArticle,
} = require('../controllers/articles');

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

router.patch('/articles/:articleId', celebrate({
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
}), updateArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex().required(),
  }),
}), deleteArticle);

module.exports = router;
