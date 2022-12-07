// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://a0637716.xsph.ru',
  'a0637716.xsph.ru',
  'https://a0637716.xsph.ru',
  'http://a0637716.xsph.ru',
  'http://creativempire.ru',
  'https://creativempire.ru',
  'https://www.creativempire.ru',
  'http://www.creativempire.ru',
  'creativempire.ru',
];

const corsRules = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['x-csrf-token'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Request-Headers', 'x-csrf-token');
    return res.end();
  }

  return next();
};

module.exports = {
  corsRules,
};
