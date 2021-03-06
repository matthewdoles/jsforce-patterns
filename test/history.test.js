const {
  login,
  recent,
  recentAllObjects,
  recentlyUpdated,
  recentlyDeleted,
} = require('../index');

test('Should retrieve recenelty accessed Account records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
  });

  const res = await recent(conn, 'Account', (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
  expect(res).toBeTruthy();
});

test('Should fail to retrieve recenelty accessed Account records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
  });

  const recentAccountRecords = await recent(conn, 'Accout', (err, res) => {
    expect(err).toBeTruthy();
    expect(res).toBeFalsy();
  });
  expect(recentAccountRecords).toBeTruthy();
});

test('Should retrieve all recenelty accessed records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
  });

  const res = await recentAllObjects(conn, (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
  expect(res).toBeTruthy();
});

test('Should fail to retrieve all recenelty accessed records', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD,
  });

  const recentRecords = await recentAllObjects(conn, (err, res) => {
    expect(err).toBeTruthy();
    expect(res).toBeFalsy();
  });
  expect(recentRecords).toBeTruthy();
});

test('Should retrieve all updated records within given time period', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
  });
  const res = await recentlyUpdated(
    conn,
    'Contact',
    new Date().toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
    (err, res) => {
      expect(res).toBeTruthy();
    }
  );
  expect(res).toBeTruthy();
});

test('Should fail to retrieve all updated records within given time period', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD,
  });

  const updatedRecords = await recentlyUpdated(
    conn,
    'Contact',
    new Date().toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeFalsy();
    }
  );
  expect(updatedRecords).toBeTruthy();
});

test('Should retrieve all deleted records within given time period', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
  });
  const res = await recentlyDeleted(
    conn,
    'Contact',
    new Date().toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
    (err, res) => {
      expect(res).toBeTruthy();
    }
  );
  expect(res).toBeTruthy();
});

test('Should fail to retrieve all deleted records within given time period', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD,
  });

  const deletedRecords = await recentlyDeleted(
    conn,
    'Contact',
    new Date().toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeFalsy();
    }
  );
  expect(deletedRecords).toBeTruthy();
});
