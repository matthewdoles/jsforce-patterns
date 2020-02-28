const {
  login,
  createRecord,
  createMultipleRecords,
  deleteRecord,
  deleteMultipleRecords
} = require('../index');

test('Should create and delete record (w/ callbacks)', async () => {
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

  await deleteRecord(conn, 'Account', createResult.id, (err, res) => {
    expect(res).toBeTruthy();
    expect(err).toBeFalsy();
  });
});

test('Should create and delete record (w/out callbacks)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });
  expect(createResult).toBeTruthy();

  const deleteResult = await deleteRecord(conn, 'Account', createResult.id);
  expect(deleteResult).toBeTruthy();
});

test('Should create and delete multiple records (w/ callbacks)', async () => {
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

  await deleteMultipleRecords(
    conn,
    'Account',
    [createResult[0].id, createResult[1].id],
    {},
    (err, res) => {
      expect(res).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should create and delete multiple records (w/out callbacks)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const createResult = await createMultipleRecords(conn, 'Account', [
    {
      Name: 'My Account #1'
    },
    {
      Name: 'My Account #2'
    }
  ]);
  expect(createResult).toBeTruthy();

  const deleteResult = await deleteMultipleRecords(conn, 'Account', [
    createResult[0].id,
    createResult[1].id
  ]);
  expect(deleteResult).toBeTruthy();
});
