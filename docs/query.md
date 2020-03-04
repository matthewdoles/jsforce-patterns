## Query


### findOne(conn, sObject, queryOptions, callback)
Finds exactly one record mathching search criteria.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid connection which is to be ended.
queryOptions | Object | Optional | Parameters for search criteria (see below).
callback | Function | Optional | Callback function.

<b>queryOptions</b>

Name | Type | Default | Description 
--- | --- | --- | ----
conditions | Object, String	| null, no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string
fields | Object, Array< String >, String | Wildcard '*' - selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
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


### soqlQuery(conn, sObject, queryOptions, callback)
Finds records mathching search criteria.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid connection which is to be ended.
sObject | String | Required | SObject to query records from.
queryOptions | Object | Optional | Parameters for search criteria (see below).
callback | Function | Optional | Callback function.

<b>queryOptions</b>

Name | Type | Default | Description 
--- | --- | --- | ----
conditions | Object, String	| null, no conditions | Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string
fields | Object, Array< String >, String | Wildcard '*' - selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
filters | Object | - | Additional query filters (see below).

<b>filters</b>

Name | Type | Default | Description 
--- | --- | --- | ----
limit | Number	| 10 | Maximum number of records the query will return.
offset | Number | 0 |Offset number where begins returning results.
skip | Number | 0 | Synonym for offset.

#### Returns
Array< Record >

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