## findOne(conn, sObject, queryOptions, callback)
Finds exactly one record mathching search criteria.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
queryOptions | Object | Required | Parameters for search criteria (see below).
callback | Function | Optional | Callback function.

<b>queryOptions</b>

Name | Type | Default | Description 
--- | --- | --- | ----
conditions | Object, String	| null - no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
fields | Object, Array(String), String | * - wildcard selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
filters | Object | - | Additional query filters (see below).

<b>filters</b>

Name | Type | Default | Description 
--- | --- | --- | ----
limit | Number	| 10 | Maximum number of records the query will return.
offset | Number | 0 |Offset number where begins returning results.
skip | Number | 0 | Synonym for offset.

#### Returns
Record

#### Example
```javascript
const { login, findOne, logout } = require('jsforce-patterns');

const testFindOne = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const record = await findOne(
    conn,
    'Account',
    {
      conditions: { Name: { $like: 'S%' } },
      fields: ['Id', 'Name']
    },
    (err, rec) => {
      console.log(err, rec);
    }
  );
  console.log(record);

  await logout(conn);
}
```
#### JSForce Doc
[findOne](https://jsforce.github.io/jsforce/doc/SObject.html#findOne)


## soqlQuery(conn, sObject, queryOptions, callback)
Finds records mathching search criteria.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject to query records from.
queryOptions | Object | Required | Parameters for search criteria (see below).
callback | Function | Optional | Callback function.

<b>queryOptions</b>

Name | Type | Default | Description 
--- | --- | --- | ----
conditions | Object, String	| null - no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
fields | Object, Array(String), String | * - wildcard selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
filters | Object | - | Additional query filters (see below).

<b>filters</b>

Name | Type | Default | Description 
--- | --- | --- | ----
limit | Number	| 10 | Maximum number of records the query will return.
offset | Number | 0 |Offset number where begins returning results.
skip | Number | 0 | Synonym for offset.

#### Returns
Array(Record)

#### Example
```javascript
const { login, soqlQuery, logout } = require('jsforce-patterns');

const testSOQLQuery = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const records = await soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
        fields: 'Id, Name, Phone',
        options: {
          limit: 5
      }
    },
    (err, recs) => {
      console.log(recs);
    }
  );
  console.log(records);

  await logout(conn);
}
```
#### JSForce Doc
[Query Method-Chain](https://jsforce.github.io/document/#using-query-method-chain)

## soqlQueryWithChildren(conn, parentObject, parentOptions, childObject, childOptions, callback)
Finds records mathching search criteria, and any children records of those records matching another set of search criteria.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject to query records from.
parentOptions | Object | Required | Parameters for search criteria (see below).
childObject | String | Required | Child SObject of parent to query records from.
childOptions | Object | Required | Parameters for search criteria (see below).
callback | Function | Optional | Callback function.

<b>parentOptions & childOptions</b>

Name | Type | Default | Description 
--- | --- | --- | ----
conditions | Object, String	| null - no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
fields | Object, Array(String), String | * - wildcard selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
filters | Object | - | Additional query filters (see below).

<b>filters</b>

Name | Type | Default | Description 
--- | --- | --- | ----
limit | Number	| 10 | Maximum number of records the query will return.
offset | Number | 0 |Offset number where begins returning results.
skip | Number | 0 | Synonym for offset.

#### Returns
Array(Record)

#### Example
```javascript
const { login, soqlQueryWithChildren, logout } = require('jsforce-patterns');

const testSOQLQueryWithChildren = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const records = await soqlQueryWithChildren(
    conn,
    'Contat',
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
      console.log(recs);
    }
  );
  console.log(records);

  await logout(conn);
}
```
#### JSForce Doc
Sub-section of [Query Method-Chain](https://jsforce.github.io/document/#using-query-method-chain)

## soslSearch(conn, query, callback)
Executes defined SOSL search and returns results.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
query | String | Required | Valid SOSL query.
callback | Function | Optional | Callback function.

#### Returns
Array(RecordResult)

#### Example
```javascript
const { login, soslSearch, logout } = require('jsforce-patterns');

const testSoslSearch = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const records = await query.soslSearch(
    conn,
    'FIND {Ab*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)',
    (err, recs) => {
      console.log(err, recs);
    }
  );
  console.log(records.length);

  await logout(conn);
}
```
#### JSForce Doc
[search](https://jsforce.github.io/document/#search)