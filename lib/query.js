const defaultFindConditions = {
  conditions: '',
  fields: '*',
  filters: {
    limit: 10,
    offset: 0,
    skip: 0
  }
};

const findOne = async (conn, sObject, queryOptions, callback) => {
  if (Object.entries(queryOptions).length === 0) {
    queryOptions = defaultFindConditions;
  }
  let record;
  try {
    await conn
      .sobject(sObject)
      .findOne(
        queryOptions.conditions,
        queryOptions.fields,
        queryOptions.filters
      )
      .execute((err, rec) => {
        if (callback) {
          callback(err, rec);
        }
        if (err) {
          throw err;
        }
        record = rec;
      });
    return record;
  } catch (err) {
    return err;
  }
};

// const selectRecordById = async (conn, sObject, recordId, fields) => {
//   let record;
//   await conn
//     .sobject(sObject)
//     .find({ Id: recordId }, fields)
//     .execute((err, res) => {
//       if (err) {
//         return console.error(err);
//       }
//       record = res[0];
//     });
//   return record;
// };

const soqlQuery = async (conn, sObject, queryOptions, callback) => {
  if (Object.entries(queryOptions).length === 0) {
    queryOptions = defaultFindConditions;
  }
  let records;
  try {
    await conn
      .sobject(sObject)
      .find(queryOptions.conditions, queryOptions.fields, queryOptions.filters)
      .execute((err, recs) => {
        if (callback) {
          callback(err, recs);
        }
        records = recs;
      });
    if (records.length === 0) {
      return null;
    }
    return records;
  } catch (err) {
    return err;
  }
};

const soqlQueryWithChildren = async (
  conn,
  parentObject,
  parentOptions,
  childObject,
  childOptions,
  callback
) => {
  if (Object.entries(parentOptions).length === 0) {
    parentOptions = defaultFindConditions;
  }
  if (Object.entries(childOptions).length === 0) {
    childOptions = defaultFindConditions;
  }
  let records;
  try {
    await conn
      .sobject(parentObject)
      .find(
        parentOptions.conditions,
        parentOptions.fields,
        parentOptions.filters
      )
      .include(
        childObject,
        childOptions.conditions,
        childOptions.fields,
        childOptions.filters
      )
      .end()
      .execute((err, recs) => {
        if (callback) {
          callback(err, recs);
        }
        records = recs;
      });
    if (records.length === 0) {
      return null;
    }
    return records;
  } catch (err) {
    return err;
  }
};

const soslSearch = async (conn, query, callback) => {
  let records;
  try {
    await conn.search(query, (err, recs) => {
      if (callback) {
        callback(err, recs);
      }
      records = recs.searchRecords;
    });
    if (records.length === 0) {
      return null;
    }
    return records;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findOne,
  soqlQuery,
  soqlQueryWithChildren,
  soslSearch
};
