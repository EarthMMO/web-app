module.exports = {
  //images: {
  //  domains: ["s.gravatar.com"],
  //},
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: "node-loader",
        },
      ],
    });

    return config;
  },
};
