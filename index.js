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

const accountQuery = async conn => {
  let accountRecord;
  await conn
    .sobject('Account')
    .find({ Id: process.env.SF_ACCOUNT_RECORD_ID })
    .execute((err, result) => {
      if (err) {
        return console.error(err);
      }
      accountRecord = result[0];
    });
  return accountRecord;
};

const update = async (conn, recordId, newAccountName) => {
  await conn.sobject('Account').update(
    {
      Id: recordId,
      Name: newAccountName
    },
    (err, ret) => {
      if (err || !ret.success) {
        return console.error(err, ret);
      }
      console.log(chalk.bold.green('Updated Successfully!'));
    }
  );
};

const execute = async () => {
  // Login
  const conn = await login(true);

  // Query
  console.log(chalk.bold.red('Execute Query...'));
  const record = await accountQuery(conn);
  console.log(chalk.cyan('Current Account Name:'), record.Name);
  const newAccountName = 'Updated Account #' + Math.floor(Math.random() * 1000);
  console.log(chalk.cyan('Change Account Name To:'), newAccountName);

  // Update
  await update(conn, record.Id, newAccountName);

  // Verify
  console.log(chalk.bold.red('Execute Query...'));
  const updatedRecord = await accountQuery(conn);
  console.log(chalk.cyan('Updated Account Name:'), updatedRecord.Name);

  // Logout
  await logout(conn);
};

execute();
