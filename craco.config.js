const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@admin': path.resolve(__dirname, 'src/admin'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
};
