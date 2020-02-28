const { login, logout } = require('../index');

test('Should login and logiut user (w/ callbacks)', async () => {
  const conn = await login(
    {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
    },
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );

  logout(conn, err => {
    expect(err).toBeFalsy();
  });
});

test('Should login and logiut user (w/out callbacks)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  expect(conn).toBeTruthy();

  setTimeout(() => {
    logout(conn);
  }, 2000);
});
