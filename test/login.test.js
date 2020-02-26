const { login } = require('../index');

test('Should login user (w/ callback)', () => {
  login(
    {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
    },
    (err, res) => {
      expect(res.id).toBeTruthy();
      expect(res.organizationId).toBeTruthy();
      expect(res.url).toBeTruthy();
    }
  );
});

test('Should login user (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  expect(conn.accessToken).toBeTruthy();
  expect(conn.instanceUrl).toBeTruthy();
});

test('Should fail to login user (w/ callback)', () => {
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

test('Should fail to login user (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: 'nottherightpassword'
  });
  expect(conn.accessToken).toBeFalsy();
  expect(conn.instanceUrl).toBeFalsy();
});

