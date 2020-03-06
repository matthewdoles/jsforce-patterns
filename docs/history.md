## recent(conn, sObject, callback)<a name="recent"></a>
Returns recently accessed records from targeted SObject.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject to retrieve recently accessed records from.
callback | Function | Optional | Callback function.

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, recent, logout } = require('jsforce-patterns');

const testRecent = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const results = await recent(conn, 'Account', (err, res) => {
    console.log(res);
  });
  console.log(results);

  await logout(conn);
}
```
#### JSForce Doc
[Recently Accessed Records](https://jsforce.github.io/document/#recently-accessed-records)

## recentAllObjects(conn, callback)<a name="recent-all-objects"></a>
Returns recently accessed records from all SObjects.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
callback | Function | Optional | Callback function.

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, recentAllObjects, logout } = require('jsforce-patterns');

const testRecent = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const results = await recentAllObjects(conn, (err, res) => {
    console.log(res);
  });
  console.log(results);

  await logout(conn);
}
```
#### JSForce Doc
[Recently Accessed Records](https://jsforce.github.io/document/#recently-accessed-records)

## recentlyUpdated(conn, sObject, startDate, endDate, callback)<a name="recently-updated"></a>
Returns recently updated records from targeted SObject within two dates.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject to retrieve recently updated records from.
startDate | String | Required | 'YYY-MM-DD'.
endDate | Function | Required | 'YYY-MM-DD'.
callback | Function | Optional | Callback function.

#### Returns
UpdatedRecordsInfo

#### Example
```javascript
const { login, recentAllObjects, logout } = require('jsforce-patterns');

const testRecent = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const results = await recentlyUpdated(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      console.log(res.latestDateCovered);
      console.log(res.ids.length);
    }
  );
  console.log(results);

  await logout(conn);
}
```
#### JSForce Doc
[Recently Updated Records](https://jsforce.github.io/document/#recently-updated-records)

## recentlyDeleted(conn, sObject, startDate, endDate, callback)<a name="recently-deleted"></a>
Returns recently deleted records from targeted SObject within two dates.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject to retrieve recently deleted records from.
startDate | String | Required | 'YYY-MM-DD'.
endDate | Function | Required | 'YYY-MM-DD'.
callback | Function | Optional | Callback function.

#### Returns
DeletedRecordsInfo

#### Example
```javascript
const { login, recentAllObjects, logout } = require('jsforce-patterns');

const testRecent = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const results = await jsforce.recentlyDeleted(
    conn,
    'Contact',
    '2020-02-20',
    '2020-02-26',
    (err, res) => {
      console.log(res.deletedRecords.length);
    }
  );
  console.log(results);

  await logout(conn);
}
```
#### JSForce Doc
[Recently Deleted Records](https://jsforce.github.io/document/#recently-deleted-records)