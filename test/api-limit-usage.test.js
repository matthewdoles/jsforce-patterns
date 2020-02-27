const { login, apiLimit, apiUsed } = require('../index');

test('Should retrieve API usage limit for org', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  setTimeout(() => {
    const limit = apiLimit(conn);
    expect(limit).toBeTruthy();
  }, 3000);
});

test('Should retrieve API usage used for org', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  setTimeout(() => {
    const used = apiUsed(conn);
    expect(used).toBeTruthy();
  }, 3000);
});
