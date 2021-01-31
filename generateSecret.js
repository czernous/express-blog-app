const crypto = require('crypto');
const fs = require('fs');

const sessionSecret = crypto.randomBytes(50).toString('hex');

fs.appendFileSync(`${__dirname}/.env`, `SESSION_SECRET=${sessionSecret}`);
