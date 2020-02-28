const jsforce = require('jsforce');

const login = async (loginOptions, callback) => {
  const conn = new jsforce.Connection();
  await conn.login(loginOptions.username, loginOptions.password, (err, res) => {
    if (callback) {
      callback(err, res);
    }
  });
  return conn;
};

const logout = async (conn, callback) => {
  conn.logout(err => {
    if (callback) {
      callback(err);
    }
  });
};

const apiLimit = conn => conn.limitInfo.apiUsage.limit;

const apiUsed = conn => conn.limitInfo.apiUsage.used;

module.exports = {
  login,
  logout,
  apiLimit,
  apiUsed
};
