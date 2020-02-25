const describeObject = async (conn, sObject, callback) => {
  const meta = await conn.describe$('Account', (err, meta) => {
    if (callback) {
      callback(err, meta);
    }
  });
  return meta;
};

const describeGlobal = async (conn, callback) => {
  const meta = await conn.describeGlobal$(function(err, meta) {
    if (callback) {
      return callback(err, meta);
    }
  });
  return meta;
};

const identity = async (conn, callback) => {
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
