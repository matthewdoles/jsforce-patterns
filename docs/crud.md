## createRecord(conn, sObject, record, callback)
Creates provided record.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be created.
record | Object | Required | Object including record field information.
callback | Function | Optional | Callback function.

#### Returns
RecordResult

#### Example
```javascript
const { login, createRecord, logout } = require('jsforce-patterns');

const testCreateRecord = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const createResult = await createRecord(
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

  await logout(conn);
}
```
#### JSForce Doc
[Create](https://jsforce.github.io/document/#create)

## createMultipleRecords(conn, sObject, record, options, callback)
Creates provided records.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be created.
record | Object | Required | Object including record field information.
options | Object | Optional | Options for handling operation (see below).
callback | Function | Optional | Callback function.

<b>options</b>

Name | Type | Default | Description 
--- | --- | --- | ----
allOrNone | Boolean	| false | If any records fail to insert, rollback all created records.
allowRecursive | Boolean | false | Set to true when inserting more that 200 records to avoid governor limits.
For more info: [Operation Options](https://jsforce.github.io/document/#operation-options)

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, createMultipleRecords, logout } = require('jsforce-patterns');

const testCreateRecord = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
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
    { allOrNone: true },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(createResult);

  await logout(conn);
}
```
#### JSForce Doc
[Create](https://jsforce.github.io/document/#create)