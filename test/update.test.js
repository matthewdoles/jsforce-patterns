const { login, updateRecord, updateMultipleRecords } = require('../index');

test('Should update record (w/ callbacks)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  updateRecord(
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
});

test('Should update records (w/ callbacks)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  updateRecord(
    conn,
    'Account',
    [{
      Id: process.env.SF_ACCOUNT_RECORD_ID,
      Name: 'Test Account Name'
    }],
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});
