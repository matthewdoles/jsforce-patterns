const chalk = require("chalk");

const createRecord = async (conn, sObject, fields) => {
  let recordId;
  await conn.sobject(sObject).create(fields, (err, res) => {
    if (err || !res.success) {
      return console.log(err);
    }
    console.log(chalk.bold.green("Created Successfully!"));
    recordId = res.id;
  });
  return recordId;
};

const selectRecordById = async (conn, sObject, recordId, fields) => {
  let record;
  await conn
    .sobject(sObject)
    .find({ Id: recordId }, fields)
    .execute((err, res) => {
      if (err) {
        return console.error(err);
      }
      record = res[0];
    });
  return record;
};

const retrieveRecord = async (conn, sObject, recordId) => {
  let record;
  await conn.sobject(sObject).retrieve(recordId, function(err, res) {
    if (err) {
      return console.error(err);
    }
    record = res;
  });
  return record;
};

const retrieveMultipleRecords = async (conn, sObject, recordIds) =>
  await retrieveRecord(conn, sObject, recordIds);

const updateRecord = async (conn, sObject, updateFields) => {
  await conn.sobject(sObject).update(updateFields, (err, res) => {
    if (err) {
      return console.error(err, res);
    }
    console.log(chalk.bold.green("Updated Successfully!"));
  });
};

const updateMultipleRecords = async (conn, sObject, updateFields) =>
  await updateRecord(conn, sObject, updateFields);

const deleteRecord = async (conn, sObject, recordId) => {
  await conn.sobject(sObject).destroy(recordId, (err, res) => {
    if (err) {
      return console.error(err, res);
    }
    console.log(chalk.bold.red("Deleted Successfully!"));
  });
};

const deleteMultipleRecords = async (conn, sObject, recordIds) =>
  await deleteRecord(conn, sObject, recordIds);

module.exports = {
  createRecord,
  selectRecordById,
  retrieveRecord,
  retrieveMultipleRecords,
  updateRecord,
  updateMultipleRecords,
  deleteRecord,
  deleteMultipleRecords
};
