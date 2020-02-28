const recent = async (conn, sObject, callback) => {
  const results = await conn.sobject(sObject).recent((err, res) => {
    if (callback) {
      return callback(err, res);
    }
  });
  return results;
};

const recentAllObjects = async (conn, callback) => recent(conn, '', callback);

const recentlyUpdated = async (conn, sObject, startDate, endDate, callback) => {
  const results = await conn
    .sobject(sObject)
    .updated(startDate, endDate, (err, res) => {
      if (callback) {
        return callback(err, res);
      }
    });
  return results;
};

const recentlyDeleted = async (conn, sObject, startDate, endDate, callback) => {
  const results = await conn
    .sobject(sObject)
    .deleted(startDate, endDate, (err, res) => {
      if (callback) {
        return callback(err, res);
      }
    });
  return results;
};

module.exports = {
  recent,
  recentAllObjects,
  recentlyUpdated,
  recentlyDeleted
};
