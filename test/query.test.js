const {
  login,
  findOne,
  soqlQuery,
  soqlQueryWithChildren,
  soslSearch
} = require('../index');

test('Should find exactly one Account record (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await findOne(
    conn,
    'Account',
    {
      conditions: { Name: { $like: 'S%' } },
      fields: ['Id', 'Name']
    },
    (err, rec) => {
      expect(rec).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should find exactly one Account record w/ default conditions (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await findOne(conn, 'Account', {}, (err, rec) => {
    expect(rec).toBeTruthy();
    expect(err).toBeFalsy();
  });
});

test('Should find exactly one Account record (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const rec = await findOne(conn, 'Account', {
    conditions: { Name: { $like: 'S%' } },
    fields: ['Id', 'Name']
  });
  expect(rec).toBeTruthy();
});

test('Should query Contact records (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      }
    },
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should query Contact records w/ default conditions (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await soqlQuery(conn, 'Contact', {});
});

test('Should query Contact records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQuery(conn, 'Contact', {
    conditions: {
      Name: { $like: 'A%' }
    },
    fields: '*, Account.*',
    options: {
      limit: 5
    }
  });
  expect(recs).toBeTruthy();
});

test('Should query Contact records w/ children (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await soqlQueryWithChildren(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      }
    },
    'Cases',
    { fields: 'CaseNumber' },
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should query Contact records w/ children w/ default conditions (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await soqlQueryWithChildren(conn, 'Contact', {}, 'Cases', {}, (err, recs) => {
    expect(recs).toBeTruthy();
    expect(err).toBeFalsy();
  });
});

test('Should query Contact records (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQueryWithChildren(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      }
    },
    'Cases',
    {}
  );
  expect(recs).toBeTruthy();
});

test('Should execute SOSL Search (w/ callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  await soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
});

test('Should execute SOSL Search (w/out callback)', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)'
  );
  expect(recs).toBeTruthy();
});
