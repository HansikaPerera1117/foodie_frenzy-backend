module.exports = {
  apps: [
    {
      name: 'address_shop',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_file: '.env',
    },
  ],
};
