## describeObject(conn, sObject, callback)<a name="describe-object"></a>
Fetches SObject metadata.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
sObject | String | Required | SObject metadata to retrieve.
callback | Function | Optional | Callback function.

#### Returns
DescribeSObjectResult

#### Example
```javascript
const { login, describeObject, logout } = require('jsforce-patterns');

const testDescribeObject = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const meta = await describeObject(conn, 'Account', (err, res) => {
    console.log(res);
  });
  console.log(meta);

  await logout(conn);
}
```
#### JSForce Doc
[Describe SObject](https://jsforce.github.io/document/#describe-sobject)

## describeGlobal(conn, callback)<a name="describe-global"></a>
Returns overview of all SObject information in targeted Salesforce org.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
callback | Function | Optional | Callback function.

#### Returns
DescribeGlobalResult

#### Example
```javascript
const { login, describeGlobal, logout } = require('jsforce-patterns');

const testDescribeGlobal = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const meta = await describeGlobal(conn, (err, meta) => {
    console.log(meta.sobjects.length);
  });
  console.log(meta.sobjects.length);

  await logout(conn);
}
```
#### JSForce Doc
[Describe Global](https://jsforce.github.io/document/#describe-global)

## identity(conn, callback)<a name="identity"></a>
Returns user identity information.

#### Parameters
Name | Type | Attributes | Description 
--- | --- | --- | ---
conn | JSForce.Connection() | Required | Valid Salesforce connection.
callback | Function | Optional | Callback function.

#### Returns
IdentityInfo

#### Example
```javascript
const { login, identity, logout } = require('jsforce-patterns');

const testIdentity = async () => {
  const conn = await login({ 
    username: 'your username', 
    password: 'your password' 
  });

  const userInfo = await identity(conn, (err, res) => {
    console.log(res);
  });
  console.log(userInfo);

  await logout(conn);
}
```
#### JSForce Doc
[Identity](https://jsforce.github.io/document/#identity)