const { login, describeObject, describeGlobal, identity } = require('../index');

test('Should describe Account object (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await describeObject(conn, 'Account', (err, meta) => {
    expect(meta.label).toBeTruthy();
    expect(meta.fields).toBeTruthy();
  });
});

test('Should describe Account object (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const meta = await describeObject(conn, 'Account');
  expect(meta.label).toBeTruthy();
  expect(meta.fields).toBeTruthy();
});

test('Should fail to describe Account object', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD
  });

  const accountObject = await describeObject(conn, 'Account', (err, meta) => {
    expect(err).toBeTruthy();
    expect(meta).toBeFalsy();
  });
  expect(accountObject).toBeTruthy();
});

test('Should describe global object information (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  describeGlobal(conn, (err, meta) => {
    expect(meta.sobjects.length).toBeTruthy();
  });
});

test('Should describe global object information (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const meta = await describeGlobal(conn);
  expect(meta.sobjects.length).toBeTruthy();
});

test('Should fail to describe global object information', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD
  });

  const globalInfo = await describeGlobal(conn, (err, meta) => {
    expect(err).toBeTruthy();
    expect(meta).toBeFalsy();
  });
  expect(globalInfo).toBeTruthy();
});

test('Should describe identity information (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  identity(conn, (err, meta) => {
    expect(meta.user_id).toBeTruthy();
    expect(meta.organization_id).toBeTruthy();
    expect(meta.username).toBeTruthy();
    expect(meta.display_name).toBeTruthy();
  });
});

test('Should describe identity information (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });
  const response = await identity(conn);
  expect(response.user_id).toBeTruthy();
  expect(response.organization_id).toBeTruthy();
  expect(response.username).toBeTruthy();
  expect(response.display_name).toBeTruthy();
});

test('Should fail to describe identity information', async () => {
  const conn = await login({
    username: 'invalidusername',
    password: process.env.SF_PASSWORD
  });

  const identityInfo = await identity(conn, (err, meta) => {
    expect(err).toBeTruthy();
    expect(meta).toBeFalsy();
  });
  expect(identityInfo).toBeTruthy();
});
