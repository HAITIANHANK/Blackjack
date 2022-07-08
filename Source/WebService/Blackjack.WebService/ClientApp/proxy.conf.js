const { env } = require('process');


const PROXY_CONFIG = [
  {
    context: () => true,
    target: 'http://localhost:5270',
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
