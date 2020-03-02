const { login, queryAndUpdateRecords } = require('../index');

test('Should query and update records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'Ama%' }
    },
    {
      Phone: 1234567890
    },
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should query and update records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const updateResults = await queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'Ama%' }
    },
    {
      Phone: 1234567890
    }
  );
  expect(updateResults).toBeTruthy();
});

test('Should fail to query and update records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const updateResult = await queryAndUpdateRecords(
    conn,
    'Contat',
    {
      Name: { $like: 'Ama%' }
    },
    {
      Phone: 1234567890
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(updateResult).toBeTruthy();
});