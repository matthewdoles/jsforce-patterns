const chalk = require('chalk');
const auth = require('./connection');
const services = require('./crud');
const query = require('./query');

const execute = async () => {
  // Login
  const conn = await auth.login(true);

  // Query
  console.log(chalk.bold.red('Execute Query...'));
  const record = await query.findOne(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID,
    'Id, Name'
  );
  console.log(chalk.cyan('Current Account Name:'), record.Name);
  const newAccountName = 'Updated Account #' + Math.floor(Math.random() * 1000);
  console.log(chalk.cyan('Change Account Name To:'), newAccountName);

  // Update
  await services.updateMultipleRecords(
    conn,
    'Account',
    [
      {
        Id: record.Id,
        Name: newAccountName
      }
    ],
    { allOrNone: true, allowRecursive: true }
  );

  // Verify
  console.log(chalk.bold.red('Execute Query...'));
  const updatedRecord = await query.findOne(
    conn,
    'Account',
    record.Id,
    'Id, Name'
  );
  console.log(chalk.cyan('Updated Account Name:'), updatedRecord.Name);

  // Logout
  await auth.logout(conn);
};

const testCreateDelete = async () => {
  const conn = await auth.login(true);
  const createResult = await services.createRecord(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(createResult);
  const deleteResult = await services.deleteRecord(
    conn,
    'Account',
    createResult.id,
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(deleteResult);
  await auth.logout(conn);
};

const testRetrieve = async () => {
  const conn = await auth.login(true);
  const record = await services.retrieveRecords(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID,
    (err, rec) => {
      console.log(err, rec);
    }
  );
  console.log(record);
  await auth.logout(conn);
};

const testUpdate = async () => {
  const conn = await auth.login(true);
  const result = await services.updateRecord(
    conn,
    'Account',
    {
      Id: process.env.SF_ACCOUNT_RECORD_ID,
      Name: 'Test Account Name'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await auth.logout(conn);
};

const testQueryAndUpdate = async () => {
  const conn = await auth.login(true);
  const result = await services.queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'Ama%' }
    },
    {
      Phone: 1234567890
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await auth.logout(conn);
};

const testQueryAndDelete = async () => {
  const conn = await auth.login(true);

  const createResult = await services.createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });
  console.log(createResult);

  const result = await services.queryAndDeleteRecords(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },(err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await auth.logout(conn);
};

const testSoqlQuery = async () => {
  const conn = await auth.login(true);
  const records = await query.soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      }
    },
    (err, recs) => {
      console.log(err, recs);
    }
  );
  console.log(records.length);
  await auth.logout(conn);
};

const testFindOne = async () => {
  const conn = await auth.login(true);
  const record = await query.findOne(
    conn,
    'Account',
    {
      conditions: { Name: { $like: 'S%' } },
      fields: ['Id', 'Name']
    },
    (err, rec) => {
      console.log(err, rec);
    }
  );
  console.log(record);
  await auth.logout(conn);
};

const testSoslSearch = async () => {
  const conn = await auth.login(true);
  const records = await query.soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      console.log(err, recs);
    }
  );
  console.log(records.length);
  await auth.logout(conn);
};

testQueryAndDelete();
