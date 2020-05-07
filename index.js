'use strict';

const http = require('http');

const args = process.argv.slice(2);

function requestClient(url='', c=false) {
  const agent = new http.Agent({ keepAlive: true });
  const req = http
    .get(url, { agent }, res => {
      console.log(`Status: ${res.statusCode}`);
      if (!c) process.exit(0);
    })
    .on('error', (err) => {
      console.log(err);
      if (!c) process.exit(1);
    });

    return req;
}

if (args.length === 1) {
  requestClient(args[0]);
} else if (args.length === 2 && (args[1] === '-c' || args[1] === '--continue')) {
  setInterval(() => {
    requestClient(args[0], true);
  }, 1000);
}
