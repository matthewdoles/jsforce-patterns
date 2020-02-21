const chalk = require('chalk');

const selectRecordById = async (conn, sObject, recordId, fields) => {
  let record;
  await conn
    .sobject(sObject)
    .find({ Id: recordId }, fields)
    .execute((err, result) => {
      if (err) {
        return console.error(err);
      }
      record = result[0];
    });
  return record;
};

const updateRecord = async (conn, sObject, updateFields) => {
  await conn.sobject(sObject).update(updateFields, (err, ret) => {
    if (err || !ret.success) {
      return console.error(err, ret);
    }
    console.log(chalk.bold.green('Updated Successfully!'));
  });
};

module.exports = {
  selectRecordById,
  updateRecord
};
