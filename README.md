### JSForce Patterns
[![Build Status](https://travis-ci.org/matthewdoles/jsforce-patterns.svg?branch=master)](https://travis-ci.org/matthewdoles/jsforce-patterns)

// TODO: Update documentation

#### Overview
Playing around with the [JSForce](https://jsforce.github.io/start/) library which gives ease of access to the various Salesforce APIs. To run locally - pull down code, install dependencies (npm install), provide the necessary environemnt vairables, and execute code (npm start). The required environemnt variables include a username and password (may need to append API token) to your own Salesforce environment - and any hardcoded Account record Id from your org. Nodemon is provided as a dev dependency and environment variables can be provided through a nodemon.json file (use npm run dev instead of npm start).

#### Account Name Update
Query for specifc Account record, update record with new random number in Account Name, and verify Account record was updated.

Sample Execution:

```
Login Successful!
URL: *** Logged in Org URL ***
User ID: *** Logged in User ID ***
Org ID: *** Logged in Org ID ***
Execute Query...
Current Account Name: Updated Account #631
Change Account Name To: Updated Account #768
Updated Successfully!
Execute Query...
Updated Account Name: Updated Account #768
Logout Successful!
```
