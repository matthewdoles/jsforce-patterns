const { login, apiLimit, apiUsed } = require('../index');

test('Should retrieve API usage limit for org if valid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  setTimeout(() => {
    const limit = apiLimit(conn);
    expect(limit).toBeTruthy();
  }, 2000);
});

test('Should not retrieve API usage limit for org if invalid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: 'nottherightpassword'
  });
  setTimeout(() => {
    const limit = apiLimit(conn);
    expect(limit).toBeUndefined();
  }, 2000);
});

test('Should retrieve API usage used for org if valid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  setTimeout(() => {
    const used = apiUsed(conn);
    expect(used).toBeTruthy();
  }, 2000);
});

test('Should not retrieve API usage used for org if invalid connection', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: 'nottherightpassword'
  });
  setTimeout(() => {
    const used = apiUsed(conn);
    expect(used).toBeUndefined();
  }, 2000);
});
