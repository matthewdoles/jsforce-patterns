const { login, retrieveRecord, retrieveMultipleRecords } = require('../index');

test('Should retrieve record (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID,
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should retrieve record (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const retrieveResult = await retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID
  );
  expect(retrieveResult).toBeTruthy();
});

test('Should retrieve multiple records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  retrieveMultipleRecords(
    conn,
    'Account',
    [process.env.SF_ACCOUNT_RECORD_ID],
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should retrieve multiple records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const retrieveResult = await retrieveMultipleRecords(
    conn,
    'Account',
    [process.env.SF_ACCOUNT_RECORD_ID]
  );
  expect(retrieveResult).toBeTruthy();
});

test('Should fail to retrieve record ', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const retrieveResult = retrieveRecord(
    conn,
    'Accout',
    process.env.SF_ACCOUNT_RECORD_ID,
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(retrieveResult).toBeTruthy();
});

test('Should fail to retrieve multiple records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const retrieveResult = await retrieveMultipleRecords(
    conn,
    'Accout',
    [process.env.SF_ACCOUNT_RECORD_ID],
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(retrieveResult).toBeTruthy();
});
