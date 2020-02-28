const { login, retrieveRecord, apiLimit, apiUsed } = require('../index');

test('Should retrieve API usage limit for org if valid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID
  );
  const limit = apiLimit(conn);
  expect(limit).toBeTruthy();
});

test('Should retrieve API usage used for org if valid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID
  );
  const used = apiUsed(conn);
   expect(used).toBeTruthy();
});
