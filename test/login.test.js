const { login } = require('../index');

test('Should login user', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  expect(conn.userInfo.id).toBeTruthy();
  expect(conn.instanceUrl).toBeTruthy();
  expect(conn.accessToken).toBeTruthy();
});
