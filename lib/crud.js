// CREATE
const createRecord = async (conn, sObject, record, callback) => {
  try {
    const result = await conn.sobject(sObject).create(record, callback);
    return result;
  } catch (err) {
    return err;
  }
};

const createMultipleRecords = async (
  conn,
  sObject,
  records,
  options,
  callback
) => {
  if (callback === undefined && typeof options === 'function') {
    callback = options;
    options = null;
  }

  try {
    const results = await conn
      .sobject(sObject)
      .create(records, options, callback);
    return results;
  } catch (err) {
    return err;
  }
};

// READ
const retrieveRecord = async (conn, sObject, recordId, callback) => {
  try {
    const record = await conn
      .sobject(sObject)
      .retrieve(recordId, callback);
    return record;
  } catch (err) {
    return err;
  }
};

const retrieveMultipleRecords = async (
  conn,
  sObject,
  recordIds,
  options,
  callback
) => {
  if (callback === undefined && typeof options === 'function') {
    callback = options;
    options = null;
  }

  try {
    const record = await conn
      .sobject(sObject)
      .retrieve(recordIds, options, callback);
    return record;
  } catch (err) {
    return err;
  }
};

// UPDATE
const updateRecord = async (conn, sObject, record, callback) => {
  try {
    const result = await conn.sobject(sObject).update(record, callback);
    return result;
  } catch (err) {
    return err;
  }
};

const updateMultipleRecords = async (
  conn,
  sObject,
  records,
  options,
  callback
) => {
  if (callback === undefined && typeof options === 'function') {
    callback = options;
    options = null;
  }

  try {
    const results = await conn
      .sobject(sObject)
      .update(records, options, callback);
    return results;
  } catch (err) {
    return err;
  }
};

// DELETE
const deleteRecord = async (conn, sObject, recordId, callback) => {
  try {
    const result = await conn.sobject(sObject).destroy(recordId, callback);
    return result;
  } catch (err) {
    return err;
  }
};

const deleteMultipleRecords = async (
  conn,
  sObject,
  recordIds,
  options,
  callback
) => {
  if (callback === undefined && typeof options === 'function') {
    callback = options;
    options = null;
  }
  try {
    const results = await conn
      .sobject(sObject)
      .destroy(recordIds, options, callback);
    return results;
  } catch (err) {
    return err;
  }
};

// QUERY + CRUD
const queryAndUpdateRecords = async (
  conn,
  sObject,
  conditions,
  updates,
  callback
) => {
  try {
    const results = await conn
      .sobject(sObject)
      .find(conditions)
      .update(updates, callback);
    return results;
  } catch (err) {
    return err;
  }
};

const queryAndDeleteRecords = async (conn, sObject, conditions, callback) => {
  try {
    const results = await conn
      .sobject(sObject)
      .find(conditions)
      .destroy(callback);
    return results;
  } catch (err) {
    return err;
  }
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
