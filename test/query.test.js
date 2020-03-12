const {
  login,
  findOne,
  soqlQuery,
  soqlQueryWithChildren,
  soslSearch
} = require('../index');

test('Should find exactly one Account record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const rec = await findOne(
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
  expect(rec).toBeTruthy();
});

test('Should find exactly one Account record w/ default conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const rec = await findOne(conn, 'Account', {}, (err, rec) => {
    expect(rec).toBeTruthy();
    expect(err).toBeFalsy();
  });
  expect(rec).toBeTruthy();
});

test('Should fail to find exactly one Account record', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const record = await findOne(
    conn,
    'Accout',
    {
      conditions: { Name: { $like: 'S%' } },
      fields: ['Id', 'Name']
    },
    (err, rec) => {
      expect(err).toBeTruthy();
      expect(rec).toBeFalsy();
    }
  );
  expect(record).toBeTruthy();
});

test('Should fail to find exactly one Account record matching conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const rec = await findOne(conn, 'Account', {
    conditions: { Name: { $like: 'Invalidcondition%' } },
    fields: ['Id', 'Name']
  });
  expect(rec).toBeNull();
});

test('Should query Contact records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs =  await soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      },
      sort: 'Name'
    },
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(recs).toBeTruthy();
});

test('Should query Contact records w/ default conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQuery(conn, 'Contact', {});
  expect(recs).toBeTruthy();
});

test('Should fail to query Contact records', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const records = await soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: 'notarealfield',
      options: {
        limit: 5
      }
    },
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(records).toBeTruthy();
});

test('Should fail to query Contact records matching conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQuery(conn, 'Contact', {
    conditions: {
      Name: { $like: 'Invalidcondition%' }
    },
    fields: '*, Account.*',
    options: {
      limit: 5
    }
  });
  expect(recs).toBeNull();
});

test('Should query Contact records w/ children', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQueryWithChildren(
    conn,
    'Contat',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: '*, Account.*',
      options: {
        limit: 5
      },
      sort: 'Name'
    },
    'Cases',
    { fields: 'CaseNumber' },
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(recs).toBeTruthy();
});

test('Should query Contact records w/ children w/ default conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQueryWithChildren(conn, 'Contact', {}, 'Cases', {}, (err, recs) => {
    expect(recs).toBeTruthy();
    expect(err).toBeFalsy();
  });
  expect(recs).toBeTruthy();
});

test('Should fail to query Contact records w/ children', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const records = await soqlQueryWithChildren(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: 'notarealfield',
      options: {
        limit: 5
      }
    },
    'Cases',
    {},
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(records).toBeTruthy();
});

test('Should fail to query Contact records w/ children matching conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soqlQueryWithChildren(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'Invalidcondition%' }
      },
      fields: '*',
      options: {
        limit: 5
      }
    },
    'Cases',
    {}
  );
  expect(recs).toBeNull();
});

test('Should execute SOSL Search', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const recs = await soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      expect(recs).toBeTruthy();
      expect(err).toBeFalsy();
    }
  );
  expect(recs).toBeTruthy();
});

test('Should fail to execute SOSL Search', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const records = await soslSearch(

    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      expect(err).toBeTruthy();
      expect(recs).toBeFalsy();
    }
  );
  expect(records).toBeTruthy();
});


test('Should fail to find records mathcing SOSL Search conditions', async () => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  const records = await soslSearch(
    conn,
    'FIND {Invalidsearch*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)'
  );
  expect(records).toBeNull();
});
