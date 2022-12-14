const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./uploads'));
router.use(require('./getArticles'));
router.use(require('./getPortfolios'));

router.use(require('../middlewares/auth'));
router.use(require('./users'));
router.use(require('./postArticles'));
router.use(require('./postPortfolios'));

module.exports = router;
