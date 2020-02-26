const { login } = require('../index');

test('Should login user', async () => {
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

test('Should fail to login user', async () => {
  expect(() => {
    login({
      username: process.env.SF_USERNAME,
      password: 'nottherightpassword'
    }).toThrow();
  });
});
