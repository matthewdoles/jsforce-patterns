## Notes
Most methods have an optional callback parameter - if omited, will need to async/await fucntion call in order to work with data because JSForce returns most of their methods as promises. For convenience, each method documentation also has a corresponding link to the JSForce method documentation being abstracted.

## Reference
Connection
* [login](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/connection.md#login)
* [logout](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/connection.md#logout)

Query
* [findOne](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/query.md#find-one)
* [soqlQuery](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/query.md#soql-query)
* [soqlQueryWithChildren](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/query.md#soql-query-with-children)
* [soslSearch](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/query.md#sosl-search)

CRUD
* [createRecord](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#create-record)
* [createMultipleRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#create-multiple-records)
* [retrieveRecord](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#retrieve-record)
* [retrieveMultipleRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crudery.md#retrieve-multiple-records)
* [updateRecord](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#update-record)
* [updateMultipleRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#update-multiple-records)
* [deleteRecord](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#delete-record)
* [deleteMultipleRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#delete-multiple-records)
* [queryAndUpdateRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#query-and-update-records)
* [queryAndDeleteRecords](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/crud.md#query-and-delete-records)

Describe
* [describeObject](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/describe.md#describe-object)
* [describeGlobal](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/describe.md#describe-global)
* [identity](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/describe.md#identity)

History
* [recent](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/history.md#recent)
* [recentAllObjects](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/history.md#recent-all-objects)
* [recentlyUpdated](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/history.md#recently-updated)
* [recentlyDeleted](https://github.com/matthewdoles/jsforce-patterns/blob/master/docs/history.md#recently-deleted)