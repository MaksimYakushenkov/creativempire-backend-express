const Article = require('../models/article');
const { NotFoundError } = require('../utils/errors/not-found-err');
const { BadRequestError } = require('../utils/errors/bad-request-err');
const { AuthorizedButForbidden } = require('../utils/errors/authorized-but-forbidden');
const {
  invalidProperties,
  incorrectFormatId,
  cantDeleteOtherMovie,
  movieIsDeleted,
  notFoundMovieId,
} = require('../utils/errors/constantsError');

module.exports.getArticles = (req, res, next) => {
  Article.find()
    .then((articles) => res.send({ articles }))
    .catch(next);
};

module.exports.getArticle = (req, res, next) => {
  Article.find({ url: req.params.articleUrl })
    .then((article) => {
      if (!article) {
        res.send('Не найдено');
      }
      res.send({ article });
    })
    .catch((err) => next(err));
};

module.exports.createArticle = (req, res, next) => {
  const {
    title,
    description,
    preview,
    url,
    createdAt,
    tags,
    htmlCode,
    metaTitle,
    metaDescription,
  } = req.body;
  Article.create({
    title,
    description,
    preview,
    url,
    createdAt,
    tags,
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

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundMovieId);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new AuthorizedButForbidden(cantDeleteOtherMovie);
      }
      Article.findByIdAndRemove(req.params.movieId)
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
