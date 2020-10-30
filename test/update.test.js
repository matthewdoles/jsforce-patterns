const { login, updateRecord, updateMultipleRecords } = require('../index');

test('Should update record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const updateResult = await updateRecord(
    conn,
    'Account',
    {
      Id: process.env.SF_ACCOUNT_RECORD_ID,
      Name: 'Test Account Name'
    },
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(updateResult).toBeTruthy();
});

test('Should fail to update record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const updateResult = await updateRecord(
    conn,
    'Accout',
    {
      Id: process.env.SF_ACCOUNT_RECORD_ID,
      Name: 'Test Account Name'
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(updateResult).toBeTruthy();
});

test('Should update multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const updateResult = await updateMultipleRecords(
    conn,
    'Account',
    [
      {
        Id: process.env.SF_ACCOUNT_RECORD_ID,
        Name: 'Test Account Name'
      }
    ],
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );expect(updateResult).toBeTruthy();
});

test('Should fail to update multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const updateResult = await updateMultipleRecords(
    conn,
    'Accout',
    [
      {
        Id: process.env.SF_ACCOUNT_RECORD_ID,
        Name: 'Test Account Name'
      }
    ],
    {},
    (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeTruthy();
    }
  );
  expect(updateResult).toBeTruthy();
});
