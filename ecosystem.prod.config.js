module.exports = {
  apps: [
    {
      name: 'NWC Frontend main',
      cwd: __dirname,
      script: './node_modules/http-server/bin/http-server',
      interpreter: '/usr/local/bin/node',
      args: 'build -p 3000 --proxy http://127.0.0.1:3000?',},
  ],
};
