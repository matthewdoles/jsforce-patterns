const describeObject = (conn, sObject, callback) => {
  const meta = conn.describe(sObject, (err, meta) => {
    if (callback) {
      return callback(err, meta);
    }
  });
  return meta;
};

const describeGlobal = (conn, callback) => {
  const meta = conn.describeGlobal((err, meta) => {
    if (callback) {
      return callback(err, meta);
    }
  });
  return meta;
};

const identity = (conn, callback) => {
  const res = conn.identity((err, res) => {
    if (callback) {
      return callback(err, res);
    }
  });
  return res;
};

module.exports = {
  describeObject,
  describeGlobal,
  identity
};
