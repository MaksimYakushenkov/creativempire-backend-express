const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getPortfolios, getPortfolio,
} = require('../controllers/portfolios');

router.get('/portfolios', getPortfolios);
router.get('/portfolios/:portfolioUrl', celebrate({
  params: Joi.object().keys({
    portfolioUrl: Joi.string().required(),
  }),
}), getPortfolio);

module.exports = router;
