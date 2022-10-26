const router = require('express').Router();

router.use(require('./articles'));
router.use(require('./uploads'));

module.exports = router;
