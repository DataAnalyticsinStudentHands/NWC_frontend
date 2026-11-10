module.exports = {
  apps: [
    {
      name: 'NWC Frontend dev',
      cwd: __dirname,
      script: './node_modules/http-server/bin/http-server',
      interpreter: '/usr/local/bin/node',
      args: 'build -p 5000 --proxy http://127.0.0.1:5000?',
    },
  ],
};
