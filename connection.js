const jsforce = require('jsforce');
const chalk = require('chalk');

const login = async (username, password, callback) => {
  const conn = new jsforce.Connection();
  await conn.login(
    username,
    password,
    (err, userInfo) => {
      if (callback) {
        return callback(err, userInfo);
      }
    }
  );
  return conn;
};

const logout = async conn => {
  await conn.logout(err => {
    if (err) {
      return console.log(chalk.red(err));
    }
    return console.log(chalk.bold.green('Logout Successful!'));
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
