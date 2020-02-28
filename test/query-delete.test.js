const { login, createRecord, queryAndDeleteRecords } = require('../index');

test('Should query and delete records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });

  queryAndDeleteRecords(
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
});

test('Should query and delete records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  await createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });

  const deleteResult = await queryAndDeleteRecords(conn, 'Account', {
    Name: 'My Account #1'
  });
  expect(deleteResult).toBeTruthy();
});
