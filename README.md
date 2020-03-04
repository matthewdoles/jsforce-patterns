# JSForce Patterns
[![Build Status](https://travis-ci.com/matthewdoles/jsforce-patterns.svg?branch=master)](https://travis-ci.com/matthewdoles/jsforce-patterns) ![Coveralls github](https://img.shields.io/coveralls/github/matthewdoles/jsforce-patterns)

This is a helper extension for [JSForce](https://jsforce.github.io/start/). This library aims to create reusable and dynamic functionality by abstracting repetitively used methods.

## Connection


### login(loginOptions, callback)
Establish a secure connection with targeted Salesforce org.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
loginOptions | Object | Required | Parameters to login into Salesforce org.
callback | Function | Optional | Callback function.

#### Returns
JSForce.Connection() - necessary to perform any other operations.

#### Example
Note: May need to append API token to end of password if org has IP Login Ranges.
```javascript
const { login } = require('jsforce-patterns');

const conn = login({ 
  username: 'your username', 
  password: 'your password' }, 
  (err, res) => {
  console.log(res);
});

// or

const conn = await login({ 
  username: 'your username', 
  password: 'your password' 
});
console.log(conn);
```
#### JSForce Doc
[Username and Password Login](https://jsforce.github.io/document/#username-and-password-login)


### logout(conn, callback)
Logs out and ends the established connection with targeted Salesforce org.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid connection which is to be ended
callback | Function | Optional | Callback function

#### Returns
N/A

#### Example
Note: Callback function only has error parameter, no response.
```javascript
const { login, logout } = require('jsforce-patterns');

// Valid connection
const conn = await login({ 
  username: 'your username', 
  password: 'your password' 
});

logout(conn, err => {
  console.log(err);
});

// or just...

logout(conn);

```
#### JSForce Doc
[Logout](https://jsforce.github.io/document/#logout)


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
fields | Object, Array<String>, String | Wildcard (*), selects all fields | Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
filters | Object | See filters Properties | Additional query filters (see below).

<b>filters</b>

Name | Type | Default | Description 
--- | --- | --- | ----
limit | Number	| 10 | Maximum number of records the query will return.
offset | Number | 0 |Offset number where begins returning results.
skip | Number | 0 | Synonym of options.offset.

#### Returns
Record

#### Example
```javascript
const { login, findOne, logout } = require('jsforce-patterns');

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

```
#### JSForce Doc
[findOne](https://jsforce.github.io/jsforce/doc/SObject.html#findOne)
