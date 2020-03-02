const jsforce = require('jsforce');

const login = async (loginOptions, callback) => {
  const conn = new jsforce.Connection();
  try {
    await conn.login(loginOptions.username, loginOptions.password, callback);
    return conn;
  } catch (err) {
    return err;
  }
};

const logout = (conn, callback) => {
  conn.logout(callback);
};

const apiLimit = conn => conn.limitInfo.apiUsage.limit;

const apiUsed = conn => conn.limitInfo.apiUsage.used;

module.exports = {
  login,
  logout,
  apiLimit,
  apiUsed
};
