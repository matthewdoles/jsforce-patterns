const jsforce = require('jsforce');
const chalk = require('chalk');

const login = async (loginOptions, callback) => {
  if (
    loginOptions.instanceUrl !== undefined &&
    loginOptions.accessToken !== undefined
  ) {
    const conn = new jsforce.Connection({
      instanceUrl: loginOptions.instanceUrl,
      accessToken: loginOptions.accessToken
    });
    return conn;
  }
  if (
    loginOptions.username !== undefined &&
    loginOptions.password !== undefined
  ) {
    const conn = new jsforce.Connection();
    await conn.login(
      loginOptions.username,
      loginOptions.password,
      (err, userInfo) => {
        if (callback) {
          return callback(err, userInfo);
        }
      }
    );
    return conn;
  }
};

const logout = async (conn, callback) => {
  await conn.logout(err => {
    if (callback) {
      callback(err);
    }
  });
};

const apiLimit = conn => {
  return conn.limitInfo.apiUsage.limit;
};

const apiUsed = conn => {
  return conn.limitInfo.apiUsage.used;
};

module.exports = {
  login,
  logout,
  apiLimit,
  apiUsed
};
