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
    try {
      await conn.login(
        loginOptions.username,
        loginOptions.password,
        (err, res) => {
          if (callback) {
            callback(err, res);
          }
        }
      );
    } catch (error) {
      if (callback) {
        callback(error, null);
      }
    }
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
