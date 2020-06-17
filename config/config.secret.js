require('dotenv').config();

const env = process.env.NODE_ENV ? 'production' : 'development';
const secret = process.env[env];

module.exports = {
  secret,
};
