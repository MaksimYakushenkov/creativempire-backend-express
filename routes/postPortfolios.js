const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createPortfolio, deletePortfolio, updatePortfolio,
} = require('../controllers/portfolios');

router.post('/portfolios', celebrate({
  body: Joi.object().keys({
    filter: Joi.string().required(),
    miniPreview: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    preview: Joi.string().required(),
    url: Joi.string().required(),
    tags: Joi.array().required(),
    category: Joi.string().required(),
    client: Joi.string().required(),
    duration: Joi.number().required(),
    price: Joi.number().required(),
    htmlCode: Joi.string().required(),
    metaTitle: Joi.string().required(),
    metaDescription: Joi.string().required(),
  }),
}), createPortfolio);

router.patch('/portfolios/:portfolioId', celebrate({
  body: Joi.object().keys({
    filter: Joi.string().required(),
    miniPreview: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    preview: Joi.string().required(),
    url: Joi.string().required(),
    tags: Joi.array().required(),
    category: Joi.string().required(),
    client: Joi.string().required(),
    duration: Joi.number().required(),
    price: Joi.number().required(),
    htmlCode: Joi.string().required(),
    metaTitle: Joi.string().required(),
    metaDescription: Joi.string().required(),
  }),
}), updatePortfolio);

router.delete('/portfolios/:portfolioId', celebrate({
  params: Joi.object().keys({
    portfolioId: Joi.string().length(24).hex().required(),
  }),
}), deletePortfolio);

module.exports = router;
