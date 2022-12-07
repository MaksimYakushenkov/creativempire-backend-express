const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, getArticle,
} = require('../controllers/articles');

router.get('/articles', getArticles);
router.get('/articles/:articleUrl', celebrate({
  params: Joi.object().keys({
    articleUrl: Joi.string().required(),
  }),
}), getArticle);

module.exports = router;
