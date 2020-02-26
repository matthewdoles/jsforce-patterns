const { login, logout } = require('../index');

test('Should logout user (w/ callback)', async () => {
  const conn = await login(
    {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
    }
  );
  await logout(conn);
});