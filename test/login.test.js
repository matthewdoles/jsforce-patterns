const { login } = require('../index');

test('Should login user w/ username & password (w/ callback)', () => {
  login(
    {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
    },
    (err, res) => {
      expect(res.id).toBeTruthy();
      expect(res.organizationId).toBeTruthy();
      expect(res.url).toBeTruthy();
      expect(err).toBeNull();
    }
  );
});

test('Should login user w/ username & password (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  expect(conn.accessToken).toBeTruthy();
  expect(conn.instanceUrl).toBeTruthy();
});

test('Should fail to login user w/ username & password (w/ callback)', () => {
  login(
    {
      username: process.env.SF_USERNAME,
      password: 'nottherightpassword'
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeFalsy();
    }
  );
});

test('Should fail to login user w/ username & password (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: 'nottherightpassword'
  });
  expect(conn.accessToken).toBeFalsy();
  expect(conn.instanceUrl).toBeFalsy();
});

test('Should reconnect user w/ url and access token after entering a valid username & password', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const reconnect = await login({
    instanceUrl: conn.instanceUrl,
    accessToken: conn.accessToken
  });
  setTimeout(() => {
    expect(reconnect.userInfo.id).toBeTruthy();
    expect(reconnect.userInfo.organizationId).toBeTruthy();
    expect(reconnect.userInfo.url).toBeTruthy();
  }, 2000);
});
