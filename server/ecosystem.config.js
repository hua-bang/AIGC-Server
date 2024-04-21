module.exports = {
  apps: [
    {
      name: 'aigc-server',
      script: 'npm',
      args: 'run start',
      watch: false,
      interpreter: '/bin/sh',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
