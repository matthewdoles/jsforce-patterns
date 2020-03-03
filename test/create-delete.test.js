const {
  login,
  createRecord,
  createMultipleRecords,
  deleteRecord,
  deleteMultipleRecords
} = require('../index');

test('Should create and delete record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createRecord(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(createResult).toBeTruthy();

  const deleteResult = await deleteRecord(conn, 'Account', createResult.id, (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
  expect(deleteResult).toBeTruthy();
});

test('Should create and delete multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createMultipleRecords(
    conn,
    'Account',
    [
      {
        Name: 'My Account #1'
      },
      {
        Name: 'My Account #2'
      }
    ],
    {},
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(createResult).toBeTruthy();

  const deleteResult = await deleteMultipleRecords(
    conn,
    'Account',
    [createResult[0].id, createResult[1].id],
    {},
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(deleteResult).toBeTruthy();
});

test('Should fail to create record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createRecord(
    conn,
    'Accout',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(createResult).toBeTruthy();
});

test('Should fail to create multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createMultipleRecords(
    conn,
    'Accout',
    [{
      Name: 'My Account #1'
    }],
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(createResult).toBeTruthy();
});

test('Should fail to delete record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const deleteResult = await deleteRecord(
    conn,
    'Accout',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(deleteResult).toBeTruthy();
});

test('Should fail to delete multiple records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const deleteResult = await deleteMultipleRecords(
    conn,
    'Accout',
    [{
      Name: 'My Account #1'
    }],
    (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeUndefined();
    }
  );
  expect(deleteResult).toBeTruthy();
});
