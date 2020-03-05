## login(loginOptions, callback)
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

const testLogin = async () => {
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
}
```
#### JSForce Doc
[Username and Password Login](https://jsforce.github.io/document/#username-and-password-login)


## logout(conn, callback)
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

const testLogout = async () => {

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
}
```
#### JSForce Doc
[Logout](https://jsforce.github.io/document/#logout)
