const jsforce = require('../index');

const username = process.env.SF_USERNAME;
const password = process.env.SF_PASSWORD;

const execute = async () => {
  // Login
  const conn = await jsforce.login({ username, password }, (err, res) => {
    if (!err) {
      console.log('Login successful');
    }
  });

  // Query
  console.log('Execute Query...');
  const record = await jsforce.findOne(conn, 'Account', {
    conditions: { Id: process.env.SF_ACCOUNT_RECORD_ID },
    fields: 'Id, Name'
  });
  console.log('Current Account Name:', record.Name);
  const newAccountName = 'Updated Account #' + Math.floor(Math.random() * 1000);
  console.log('Change Account Name To:', newAccountName);

  // Update
  await jsforce.updateRecord(conn, 'Account', {
    Id: record.Id,
    Name: newAccountName
  });

  // Verify
  console.log('Execute Query...');
  const updatedRecord = await jsforce.findOne(conn, 'Account', {
    conditions: { Id: process.env.SF_ACCOUNT_RECORD_ID },
    fields: 'Id, Name'
  });
  console.log('Updated Account Name:', updatedRecord.Name);

  // Logout
  await jsforce.logout(conn);
};

const testCreateDelete = async () => {
  const conn = await jsforce.login({ username, password });
  const createResult = await jsforce.createRecord(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(createResult);
  const deleteResult = await jsforce.deleteRecord(
    conn,
    'Account',
    createResult.id,
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(deleteResult);
  await jsforce.logout(conn);
};

const testRetrieve = async () => {
  const conn = await jsforce.login({ username, password }, (err, res) => {
    console.log(err, res);
  });
  console.log(conn);
  const record = await jsforce.retrieveRecord(
    conn,
    'Account',
    process.env.SF_ACCOUNT_RECORD_ID,
    (err, rec) => {
      console.log(rec);
    }
  );
  console.log(record);
  await jsforce.logout(conn);
};

const testUpdate = async () => {
  const conn = await auth.login({ username, password });
  const result = await services.updateRecord(
    conn,
    'Account',
    {
      Id: process.env.SF_ACCOUNT_RECORD_ID,
      Name: 'Test Account Name'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await auth.logout(conn);
};

const testQueryAndUpdate = async () => {
  const conn = await jsforce.login({ username, password });
  const result = await jsforce.queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'Ama%' }
    },
    {
      Phone: 1234567890
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await jsforce.logout(conn);
};

const testQueryAndUpdateWithFunction = async () => {
  const conn = await jsforce.login({ username, password });
  const result = await jsforce.queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'Ama%' }
    },
    rec => {
      console.log(rec);
      return { HomePhone: rec.Phone, Id: rec.Id };
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await jsforce.logout(conn);
};

const testQueryAndDelete = async () => {
  const conn = await auth.login({ username, password });

  const createResult = await services.createRecord(conn, 'Account', {
    Name: 'My Account #1'
  });
  console.log(createResult);

  const result = await services.queryAndDeleteRecords(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  await auth.logout(conn);
};

const testSoqlQuery = async () => {
  const conn = await jsforce.login({ username, password });
  const records = await jsforce.soqlQuery(conn, 'Contact', {
    conditions: { Name: { $like: 'A%' } },
    fields: 'Name, Account.Name',
    sort: 'Name'
  });
  console.log(records);
  await jsforce.logout(conn);
};

const testFindOne = async () => {
  const conn = await jsforce.login({ username, password });
  const record = await jsforce.findOne(
    conn,
    'Account',
    {
      conditions: { Name: { $like: 'Ssss%' } },
      fields: ['Id', 'Name']
    },
    (err, rec) => {
      console.log(err, rec);
    }
  );
  console.log(record);
  await jsforce.logout(conn);
};

const testSoslSearch = async () => {
  const conn = await auth.login({ username, password });
  const records = await query.soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      console.log(err, recs);
    }
  );
  console.log(records.length);
  await auth.logout(conn);
};

const testDescribeObject = async () => {
  const conn = await jsforce.login({ username, password });
  const meta = await jsforce.describeObject(conn, 'Account', (err, res) => {
    console.log(err, res);
  });
  console.log(meta);
  await jsforce.logout(conn);
};

const testDescribeGlobal = async () => {
  const conn = await jsforce.login({ username, password });
  const meta = await jsforce.describeGlobal(conn, (err, meta) => {
    console.log(meta.sobjects.length);
  });
  console.log(meta.sobjects.length);
  await jsforce.logout(conn);
};

const testIdentity = async () => {
  const conn = await jsforce.login({ username, password });
  const response = await jsforce.identity(conn);
  console.log(response);
  await jsforce.logout(conn);
};

const recent = async () => {
  const conn = await jsforce.login({ username, password });
  const results = await jsforce.recent(conn, 'Case', (err, res) => {
    console.log(res);
  });
  await jsforce.logout(conn);
};

const recentlyUpdated = async () => {
  const conn = await auth.login({ username, password });
  const results = await history.recentlyUpdated(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      console.log('Latest date covered: ' + res.latestDateCovered);
      console.log('Updated records : ' + res.ids.length);
    }
  );
  await auth.logout(conn);
};

const recentlyDeleted = async () => {
  const conn = await jsforce.login({ username, password });
  const results = await jsforce.recentlyDeleted(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      console.log('Ealiest date available: ' + res.earliestDateAvailable);
      console.log('Latest date covered: ' + res.latestDateCovered);
      console.log('Deleted records : ' + res.deletedRecords.length);
    }
  );
  await jsforce.logout(conn);
};

testSoqlQuery();
