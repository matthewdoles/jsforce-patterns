const { login, retrieveRecord, retrieveMultipleRecords } = require('../index');

test('Should update record (w/ callback)', async () => {
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
