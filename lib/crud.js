// CREATE
const createRecord = async (conn, sObject, record, callback) => {
  const result = await conn.sobject(sObject).create(record, (err, res) => {
    if (callback) {
      callback(err, res);
    }
  });
  return result;
};

const createMultipleRecords = async (
  conn,
  sObject,
  records,
  options,
  callback
) => {
  const results = await conn
    .sobject(sObject)
    .create(records, options, (err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return results;
};

// READ
const retrieveRecord = async (conn, sObject, recordId, callback) => {
  const record = await conn.sobject(sObject).retrieve(recordId, (err, res) => {
    if (callback) {
      callback(err, res);
    }
  });
  return record;
};

const retrieveMultipleRecords = async (
  conn,
  sObject,
  recordIds,
  options,
  callback
) => {
  const record = await conn
    .sobject(sObject)
    .retrieve(recordIds, options, (err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return record;
};

// UPDATE
const updateRecord = async (conn, sObject, record, callback) => {
  const result = await conn.sobject(sObject).update(record, (err, res) => {
    if (callback) {
      callback(err, res);
    }
  });
  return result;
};

const updateMultipleRecords = async (
  conn,
  sObject,
  records,
  options,
  callback
) => {
  const results = await conn
    .sobject(sObject)
    .update(records, options, (err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return results;
};

// DELETE
const deleteRecord = async (conn, sObject, recordId, callback) => {
  const result = await conn.sobject(sObject).destroy(recordId, (err, res) => {
    if (callback) {
      callback(err, res);
    }
  });
  return result;
};

const deleteMultipleRecords = async (
  conn,
  sObject,
  recordIds,
  options,
  callback
) => {
  const results = await conn
    .sobject(sObject)
    .destroy(recordIds, options, (err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return results;
};

// QUERY + CRUD
const queryAndUpdateRecords = async (
  conn,
  sObject,
  conditions,
  updates,
  callback
) => {
  const results = await conn
    .sobject(sObject)
    .find(conditions)
    .update(updates, (err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return results;
};

const queryAndDeleteRecords = async (
  conn,
  sObject,
  conditions,
  callback
) => {
  const results = await conn
    .sobject(sObject)
    .find(conditions)
    .destroy((err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  return results;
};

module.exports = {
  createRecord,
  createMultipleRecords,
  retrieveRecord,
  retrieveMultipleRecords,
  updateRecord,
  updateMultipleRecords,
  deleteRecord,
  deleteMultipleRecords,
  queryAndUpdateRecords,
  queryAndDeleteRecords
};
