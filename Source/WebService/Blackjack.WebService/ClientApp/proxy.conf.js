const { env } = require('process');


const PROXY_CONFIG = [
  {
    context: path => {
      const isAngularRoute = ['play'].includes(path.toLowerCase());
      return isAngularRoute === false;
    },
    target: 'http://localhost:5270',
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
