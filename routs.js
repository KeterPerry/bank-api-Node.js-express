//!routes
//* get all users route: /

//* get specific user route: /:id

//* get new user interface form /newUser

//* post new user route: /newUser
//? body input -> name, passportID, optional: accounts{cash,credit}

//* put deposit /deposit/:id/:account
//? body input -> deposit amout
//!logic check with credit and cash balance

//* put credit /credit/:id/:account
//? body input -> credit amout

//* put withdraw /withdraw/:id/:account
//!logic check with credit and cash balance
//? body input -> withdraw amout

//Transferring
