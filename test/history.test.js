const { login, recent, recentAllObjects, recentlyUpdated, recentlyDeleted } = require('../index');

test('Should retrieve recenelty accessed Account records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await recent(conn, 'Account', (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
});

test('Should retrieve recenelty accessed Account records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const res = await recent(conn, 'Account');
  expect(res).toBeTruthy();
});

test('Should retrieve all recenelty accessed records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await recentAllObjects(conn, (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
});

test('Should retrieve recenelty accessed Account records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const res = await recentAllObjects(conn);
  expect(res).toBeTruthy();
});

test('Should retrieve all updated records within given time period (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  await recentlyUpdated(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      expect(res).toBeTruthy();
    }
  );
});

test('Should retrieve all updated records within given time period (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const res = await recentlyUpdated(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26'
  );
  expect(res).toBeTruthy();
});


test('Should retrieve all deleted records within given time period (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  await recentlyDeleted(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      expect(res).toBeTruthy();
    }
  );
});

test('Should retrieve all deleted records within given time period (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const res = await recentlyDeleted(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26'
  );
  expect(res).toBeTruthy();
});