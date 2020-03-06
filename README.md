# JSForce Patterns
[![Build Status](https://travis-ci.com/matthewdoles/jsforce-patterns.svg?branch=master)](https://travis-ci.com/matthewdoles/jsforce-patterns) ![Coveralls github](https://img.shields.io/coveralls/github/matthewdoles/jsforce-patterns)

This is a helper extension for [JSForce](https://jsforce.github.io/start/). This library aims to create reusable and dynamic functionality by abstracting repetitively used methods.

### Installation
```
npm install jsforce-patterns
```

### Documentation
See docs at: https://github.com/matthewdoles/jsforce-patterns/tree/master/docs

### Example
Query for specifc Account record, update record with new random number in Account Name, and verify Account record was updated.

```javascript
const { login, findOne, updateRecord, logout } = require('jsforce-patterns');

const execute = async () => {

  // Login
  const conn = await login({ 
    username: process.env.SF_USERNAME, 
    password: process.env.SF_PASSWORD, 
  }, (err, res) => {
    if (!err) {
      console.log('Login successful')
    }
  });

  // Query
  console.log('Execute Query...');
  const record = await findOne(conn, 'Account', {
    conditions: { Id: process.env.SF_ACCOUNT_RECORD_ID },
    fields: 'Id, Name'
  });
  
  // Results
  console.log('Current Account Name:', record.Name);
  const newAccountName = 'Updated Account #' + Math.floor(Math.random() * 1000);
  console.log('Change Account Name To:', newAccountName);

  // Update
  await updateRecord(
    conn,
    'Account',
    {
      Id: record.Id,
      Name: newAccountName
    }
  );

  // Verify
  console.log('Execute Query...');
  const record = await findOne(conn, 'Account', {
    conditions: { Id: process.env.SF_ACCOUNT_RECORD_ID },
    fields: 'Id, Name'
  });
  console.log('Updated Account Name:'), updatedRecord.Name);

  // Logout
  await logout(conn, err => {
    if (!err) {
      console.log('Logout successful!')
    }
  });
};
```

<b>Execution:</b>
```
Login Successful!
Execute Query...
Current Account Name: Updated Account #631
Change Account Name To: Updated Account #768
Execute Query...
Updated Account Name: Updated Account #768
Logout Successful!
```