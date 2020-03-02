const recent = async (conn, sObject, callback) => {
  try {
    const results = await conn.sobject(sObject).recent(callback);
    return results;
  } catch (err) {
    return err;
  }
};

const recentAllObjects = async (conn, callback) => recent(conn, '', callback);

const recentlyUpdated = async (conn, sObject, startDate, endDate, callback) => {
  try {
    const results = await conn
      .sobject(sObject)
      .updated(startDate, endDate, callback);
    return results;
  } catch (err) {
    return err;
  }
};

const recentlyDeleted = async (conn, sObject, startDate, endDate, callback) => {
  try {
    const results = await conn
      .sobject(sObject)
      .deleted(startDate, endDate, (err, res) => {
        if (callback) {
          return callback(err, res);
        }
      });
    return results;
  } catch (err) {
    return err;
  }
};

module.exports = {
  recent,
  recentAllObjects,
  recentlyUpdated,
  recentlyDeleted
};
