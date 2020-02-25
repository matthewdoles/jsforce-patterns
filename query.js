const defaultFindConditions = {
  conditions: "",
  fields: "*",
  options: {
    limit: 100,
    offset: 0,
    skip: 0
  }
};

const query = async (
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

const queryWithChildren = async (
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

module.exports = {
  query,
  queryWithChildren
};
