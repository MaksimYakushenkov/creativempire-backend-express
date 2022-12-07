const Portfolio = require('../models/portfolio');
const { NotFoundError } = require('../utils/errors/not-found-err');
const { BadRequestError } = require('../utils/errors/bad-request-err');

const {
  invalidProperties,
  incorrectFormatId,
  movieIsDeleted,
  notFoundMovieId,
} = require('../utils/errors/constantsError');

module.exports.getPortfolios = (req, res, next) => {
  Portfolio.find()
    .then((portfolios) => res.send({ portfolios }))
    .catch(next);
};

module.exports.getPortfolio = (req, res, next) => {
  Portfolio.find({ url: req.params.portfolioUrl })
    .then((portfolio) => {
      if (!portfolio) {
        res.send('Не найдено');
      }
      res.send({ portfolio });
    })
    .catch((err) => next(err));
};

module.exports.createPortfolio = (req, res, next) => {
  const {
    title,
    description,
    preview,
    url,
    createdAt,
    tags,
    category,
    client,
    duration,
    price,
    htmlCode,
    metaTitle,
    metaDescription,
  } = req.body;
  Portfolio.create({
    title,
    description,
    preview,
    url,
    createdAt,
    tags,
    category,
    client,
    duration,
    price,
    htmlCode,
    metaTitle,
    metaDescription,
  })
    .then((article) => res.status(201).send({ article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(invalidProperties));
      }
      return next(err);
    });
};

module.exports.updatePortfolio = (req, res, next) => {
  const {
    title,
    description,
    preview,
    url,
    createdAt,
    tags,
    category,
    client,
    duration,
    price,
    htmlCode,
    metaTitle,
    metaDescription,
  } = req.body;
  Portfolio.findByIdAndUpdate(
    req.params.portfolioId,
    {
      title,
      description,
      preview,
      url,
      createdAt,
      tags,
      category,
      client,
      duration,
      price,
      htmlCode,
      metaTitle,
      metaDescription,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((portfolio) => res.send({ portfolio }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(invalidProperties));
      }
      return next(err);
    });
};

module.exports.deletePortfolio = (req, res, next) => {
  Portfolio.findById(req.params.portfolioId)
    .then((portfolio) => {
      if (!portfolio) {
        throw new NotFoundError(notFoundMovieId);
      }
      Portfolio.findByIdAndRemove(req.params.portfolioId)
        .then(() => res.send({ message: movieIsDeleted }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(incorrectFormatId));
      }
      return next(err);
    });
};