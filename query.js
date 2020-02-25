const defaultFindConditions = {
  conditions: '',
  fields: '*',
  options: {
    limit: 100,
    offset: 0,
    skip: 0
  }
};

const findOne = async (
  conn,
  sObject,
  queryOptions = defaultFindConditions,
  callback
) => {
  let record;
  await conn
    .sobject(sObject)
    .findOne(queryOptions.conditions, queryOptions.fields, queryOptions.options)
    .execute((err, rec) => {
      if (callback) {
        callback(err, rec);
      }
      record = rec;
    });
  return record;
};

const soqlQuery = async (
  conn,
  sObject,
  queryOptions = defaultFindConditions,
  callback
) => {
  let records;
  await conn
    .sobject(sObject)
    .find(queryOptions.conditions, queryOptions.fields, queryOptions.options)
    .execute((err, recs) => {
      if (callback) {
        callback(err, recs);
      }
      records = recs;
    });
  return records;
};

const soqlQueryWithChildren = async (
  conn,
  parentObject,
  parentOptions = defaultFindConditions,
  childObject,
  childOptions = defaultFindConditions,
  callback
) => {
  let records;
  await conn
    .sobject(parentObject)
    .find(parentOptions.conditions, parentOptions.fields, parentOptions.options)
    .include(
      childObject,
      childOptions.conditions,
      childOptions.fields,
      childOptions.options
    )
    .end()
    .execute((err, recs) => {
      if (callback) {
        callback(err, recs);
      }
      records = recs;
    });
  return records;
};

const soslSearch = async (conn, query, callback) => {
  let records;
  await conn.search(query, (err, recs) => {
    if (callback) {
      callback(err, recs);
    }
    if (recs) {
      records = recs.searchRecords
    }
  });
  return records;
};

module.exports = {
  findOne,
  soqlQuery,
  soqlQueryWithChildren,
  soslSearch
};
