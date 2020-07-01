const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://192.168.1.101:3001",
      changeOrigin: true,
      ws: true,
    })
  );
};
