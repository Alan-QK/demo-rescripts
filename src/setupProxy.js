const { createProxyMiddleware } = require('http-proxy-middleware');

const { API_HOST = 'https://devfbo.salezoom.cn/' } = process.env || {};
module.exports = function (app) {
    app.use(
        '/api/',
        createProxyMiddleware({
            target: API_HOST,
            pathRewrite: { '^/api/': '/api/' },
            changeOrigin: true,
        })
    );
};
