const chalk = require("chalk");
const auth = require("./auth");
const services = require("./services");
const query = require("./query");

const execute = async () => {
  // Login
  const conn = await auth.login(true);

  // Query
  console.log(chalk.bold.red("Execute Query..."));
  const record = await services.selectRecordById(
    conn,
    "Account",
    process.env.SF_ACCOUNT_RECORD_ID,
    "Id, Name"
  );
  console.log(chalk.cyan("Current Account Name:"), record.Name);
  const newAccountName = "Updated Account #" + Math.floor(Math.random() * 1000);
  console.log(chalk.cyan("Change Account Name To:"), newAccountName);

  // Update
  await services.updateMultipleRecords(
    conn,
    "Account",
    [
      {
        Id: record.Id,
        Name: newAccountName
      }
    ],
    { allOrNone: true, allowRecursive: true }
  );

  // Verify
  console.log(chalk.bold.red("Execute Query..."));
  const updatedRecord = await services.selectRecordById(
    conn,
    "Account",
    record.Id,
    "Id, Name"
  );
  console.log(chalk.cyan("Updated Account Name:"), updatedRecord.Name);

  // const records = await query.soslSearch(
  //   conn,
  //   "FIND {Un*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)"
  // );
  // console.log(records)

  // const records = await query.soqlQuery(
  //   conn,
  //   "Contact",
  //   {
  //     conditions: {
  //       Name: { $like: "Amanda%" }
  //     },
  //     fields: '*, Account.*',
  //     options: {
  //       limit: 5
  //     }
  //   },
  //   (err, recs) => {
  //     console.log(recs);
  //   }
  // );
  // console.log(records);

  // const retrievedRecord = await services.retrieveRecord(
  //   conn,
  //   "Account",
  //   updatedRecord.Id,
  //   (err, rec) => {
  //     console.log(rec, err);
  //   }
  // );
  // console.log(retrievedRecord);

  // const newRecordId = await services.createRecord(conn, 'Account', { Name: 'My Account #1' });
  // await services.deleteRecord(conn, 'Account', newRecordId.id)

  // Logout
  await auth.logout(conn);
};

execute();
