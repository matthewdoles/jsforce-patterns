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

## createMultipleRecords(conn, sObject, records, options, callback)
Creates provided records.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the records to be created.
records | Array(Object) | Required | Array of objects including record field information.
options | Object | Optional | Options for handling operation (see below).
callback | Function | Optional | Callback function.

<b>options</b>

Name | Type | Default | Description 
--- | --- | --- | ---
allOrNone | Boolean	| false | If any records fail to insert, rollback all created records.
allowRecursive | Boolean | false | Set to true when inserting more than 200 records to avoid governor limits.

For more info: [Operation Options](https://jsforce.github.io/document/#operation-options)

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, createMultipleRecords, logout } = require('jsforce-patterns');

const testCreateMultipleRecords = async () => {
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

## retrieveRecord(conn, sObject, recordId, callback)
Retrieves record with provided Id.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be retrieved.
recordId | String | Required | Record Id of record to retrieve.
callback | Function | Optional | Callback function.

#### Returns
Record

#### Example
```javascript
const { login, retrieveRecord, logout } = require('jsforce-patterns');

const testRetrieveRecord = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const record = await jsforce.retrieveRecord(
    conn,
    'Account',
    'account-record-id',
    (err, rec) => {
      console.log(rec);
    }
  );
  console.log(record);

  await logout(conn);
}
```
#### JSForce Doc
[Retrieve](https://jsforce.github.io/document/#retrieve)

## retrieveMultipleRecords(conn, sObject, recordIds, options, callback)
Retrieves records with provided Ids.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be created.
recordIds | Array(String) | Required | Array of record Ids to retrieve.
options | Object | Optional | Options for handling operation (see below).
callback | Function | Optional | Callback function.

<b>options</b>

Name | Type | Default | Description 
--- | --- | --- | ---
allowRecursive | Boolean | false | Set to true when retrieveing more that 200 records to avoid governor limits.

For more info: [Operation Options](https://jsforce.github.io/document/#operation-options)

#### Returns
Array(Record)

#### Example
```javascript
const { login, retrieveMultipleRecords, logout } = require('jsforce-patterns');

const testRetrieveMultipleRecords = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const records = await retrieveMultipleRecords(
    conn,
    'Account',
    ['account-record-id-1', 'account-record-id-2'],
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(records);

  await logout(conn);
}
```
#### JSForce Doc
[Retrieve](https://jsforce.github.io/document/#retrieve)

## updateRecord(conn, sObject, record, callback)
Update record with provided Id and field information.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be retrieved.
record | Object | Required | Object including record field information (must include Id).
callback | Function | Optional | Callback function.

#### Returns
RecordResult

#### Example
```javascript
const { login, updateRecord, logout } = require('jsforce-patterns');

const testUpdateRecord = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const result = await updateRecord(
    conn,
    'Account',
    {
      Id: 'account-record-id',
      Name: 'Test Account Name'
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);

  await logout(conn);
}
```
#### JSForce Doc
[Update](https://jsforce.github.io/document/#update)

## updateMultipleRecords(conn, sObject, records, options, callback)
Update records with provided Ids and field information

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the records to be updated.
records | Array(Object) | Required | Array of objects with record field information (must include Id).
options | Object | Optional | Options for handling operation (see below).
callback | Function | Optional | Callback function.

<b>options</b>

Name | Type | Default | Description 
--- | --- | --- | ---
allOrNone | Boolean	| false | If any records fail to update, rollback all updated records.
allowRecursive | Boolean | false | Set to true when updating more than 200 records to avoid governor limits.

For more info: [Operation Options](https://jsforce.github.io/document/#operation-options)

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, updateMultipleRecords, logout } = require('jsforce-patterns');

const testUpdateMultipleRecords = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const updateResult = await updateMultipleRecords(
    conn,
    'Accout',
    [
      {
        Id: 'account-record-id-1',
        Name: 'Test Account Name #1'
      },
      {
        Id: 'account-record-id-2',
        Name: 'Test Account Name #2'
      }
    ],
    { allOrNone: true },
    (err, res) => {
      console.log(res);
    }
  );
  console.log(updateResult);

  await logout(conn);
}
```
#### JSForce Doc
[Update](https://jsforce.github.io/document/#update)

## deleteRecord(conn, sObject, recordId, callback)
Delete record of provided Id.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the record to be retrieved.
recordId | Object | Required | Id of record to delete.
callback | Function | Optional | Callback function.

#### Returns
RecordResult

#### Example
```javascript
const { login, deleteRecord, logout } = require('jsforce-patterns');

const testDeleteRecord = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const deleteResult = await jsforce.deleteRecord(
    conn,
    'Account',
    'account-record-id',
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(deleteResult);

  await logout(conn);
}
```
#### JSForce Doc
[Delete](https://jsforce.github.io/document/#delete)

## deleteMultipleRecords(conn, sObject, records, options, callback)
Delete records of provided Ids.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the records to be deleted.
records | Array(String) | Required | Array of records Ids to be deleted.
options | Object | Optional | Options for handling operation (see below).
callback | Function | Optional | Callback function.

<b>options</b>

Name | Type | Default | Description 
--- | --- | --- | ---
allOrNone | Boolean	| false | If any records fail to delete, rollback all delete records.
allowRecursive | Boolean | false | Set to true when delete more than 200 records to avoid governor limits.

For more info: [Operation Options](https://jsforce.github.io/document/#operation-options)

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, deleteMultipleRecords, logout } = require('jsforce-patterns');

const testDeleteMultipleRecords = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const deleteResult = await deleteMultipleRecords(
    conn,
    'Account',
    ['account-record-id-1', 'account-record-id-2'],
    { allOrNone: true },
    (err, res) => {
      console.log(res);
    }
  );
  console.log(deleteResult);

  await logout(conn);
}
```
#### JSForce Doc
[Delete](https://jsforce.github.io/document/#delete)

## queryAndUpdateRecords(conn, sObject, conditions, updates, callback)
Query for records matching search criteria and apply defined updates.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the records to be queried and updated.
conditions | Object, String	| null - no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
updates | Object | Optional | Object of fields to update.
callback | Function | Optional | Callback function.

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, queryAndUpdateRecords, logout } = require('jsforce-patterns');

const testQueryAndUpdateRecords = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const updateResults = await queryAndUpdateRecords(
    conn,
    'Contact',
    {
      Name: { $like: 'A%' }
    },
    {
      Phone: 1234567890
    },
    (err, res) => {
      console.log(res);
    }
  );
  console.log(updateResults);

  await logout(conn);
}
```
#### JSForce Doc
[Update / Delete Queried Records](https://jsforce.github.io/document/#update-delete-queried-records)

## queryAndDeleteRecords(conn, sObject, conditions, callback)
Query for records matching search criteria and apply defined updates.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject of the records to be queried and updated.
conditions | Object, String	| null - no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
callback | Function | Optional | Callback function.

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, queryAndDeleteRecords, logout } = require('jsforce-patterns');

const testQueryAndDeleteRecords = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const deleteResult = await queryAndDeleteRecords(
    conn,
    'Account',
    {
      Name: 'My Account #1'
    },
    (err, res) => {
      console.log(res);
    }
  );
  console.log(deleteResult);

  await logout(conn);
}
```
#### JSForce Doc
[Update / Delete Queried Records](https://jsforce.github.io/document/#update-delete-queried-records)