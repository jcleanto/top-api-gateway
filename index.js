const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
 
// o logger para observar nosso API Gateway no terminal
app.use(logger('dev'));
 
function selectProxyHost(req) {
  if (req.path.startsWith('/users'))
    return 'http://localhost:3000/';
  else if (req.path.startsWith('/finances'))
    return 'http://localhost:3001/';
}
 
app.use((req, res, next) => {
  httpProxy(selectProxyHost(req))(req, res, next);
});
 
app.listen(10000, () => {
  console.log('API Gateway running!');
});
