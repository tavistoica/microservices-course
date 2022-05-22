module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
