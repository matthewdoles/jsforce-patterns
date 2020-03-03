const { login, createRecord, queryAndDeleteRecords } = require('../index');

test('Should query and delete records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });

  const deleteResult = await queryAndDeleteRecords(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(deleteResult).toBeTruthy();
});

test('Should fail to query and delete records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await createRecord(conn, 'Account', {
    Name: 'My Delete Account #1'
  });

  const deleteResult = await queryAndDeleteRecords(
    conn,
    'Accout',
    {
      Name: 'My Delete Account #1'
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(deleteResult).toBeTruthy();
});