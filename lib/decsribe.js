const describeObject = async (conn, sObject, callback) => {
  try {
    const meta = await conn.describe(sObject, callback);
    return meta;
  } catch (err) {
    return err;
  }
};

const describeGlobal = async (conn, callback) => {
  try {
    const meta = await conn.describeGlobal(callback);
    return meta;
  } catch (err) {
    return err;
  }
};

const identity = async (conn, callback) => {
  try {
    const res = await conn.identity(callback);
    return res;
  } catch (err) {
    return err;
  }
};

module.exports = {
  describeObject,
  describeGlobal,
  identity
};
