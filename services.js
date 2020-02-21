const chalk = require('chalk');

const createRecord = async (conn, sObject, fields) => {
  await conn.sobject(sObject).create(fields, (err, ret) => {
    if (err || !ret.success) {
      return console.error(err, ret);
    }
    console.log('Created record id : ' + ret.id);
  });
};

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

const retrieveRecordById = async (conn, sObject, recordId) => {
  await conn.sobject(sObject).retrieve(recordId, function(err, record) {
    if (err) {
      return console.error(err);
    }
    console.log(record);
  });
};

const retrieveMultipleRecordsById = async (conn, sObject, recordIds) =>
  await retrieveRecordById(conn, sObject, recordIds);

const updateRecordById = async (conn, sObject, updateFields) => {
  await conn.sobject(sObject).update(updateFields, (err, ret) => {
    if (err) {
      return console.error(err, ret);
    }
    console.log(chalk.bold.green('Updated Successfully!'));
  });
};

const updateMultipleRecordsById = async (conn, sObject, updateFields) =>
  await updateRecordById(conn, sObject, updateFields);

module.exports = {
  selectRecordById,
  updateRecordById,
  updateMultipleRecordsById,
  retrieveRecordById,
  retrieveMultipleRecordsById,
  createRecord
};
