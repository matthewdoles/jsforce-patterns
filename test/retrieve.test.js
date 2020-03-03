const { login, retrieveRecord, retrieveMultipleRecords } = require('../index');

test('Should retrieve record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const retrieveResult = retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID,
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(retrieveResult).toBeTruthy();
});

test('Should fail to retrieve record', async () => {
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

test('Should retrieve multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const retrieveResult = retrieveMultipleRecords(
    conn,
    'Account',
    [process.env.SF_ACCOUNT_RECORD_ID],
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(retrieveResult).toBeTruthy();
});

test('Should fail to retrieve multiple records', async () => {
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
