const withTM = require("next-transpile-modules")(["callendly"]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Will make webpack look for these modules in parent directories
      "callendly": require.resolve("callendly"),
    };
    return config;
  },
});

