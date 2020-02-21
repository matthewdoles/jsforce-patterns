const jsforce = require('jsforce');
const chalk = require('chalk');

const login = async printLoginInfo => {
  const conn = new jsforce.Connection();
  await conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD,
    (err, userInfo) => {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.bold.green('Login Successful!'));
      if (printLoginInfo) {
        console.log(chalk.magenta('URL:'), chalk.yellow(conn.instanceUrl));
        console.log(chalk.magenta('User ID:'), chalk.yellow(userInfo.id));
        console.log(
          chalk.magenta('Org ID:'),
          chalk.yellow(userInfo.organizationId)
        );
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

module.exports = {
  login,
  logout
};
