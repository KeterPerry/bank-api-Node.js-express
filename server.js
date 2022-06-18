// const route = require('./routes/weather.route');
import express from "express";
import users from "./users.js";
// import users from "users.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log("Listen to port: " + PORT);
});

// app.get("/users", (req, res) => {
//   try {
//     res.json(users.getAllUsers());
//   } catch (err) {
//     console.log("err");
//   }
// });
////////////////////////////////////////////////////////
// app.get("/users/id", (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log(id.toString());
//     res.json(users.getUser(id.toString()));
//   } catch (err) {
//     console.log("err");
//   }
// });
/////////////////////////////////////////////////////
// app.post("/users/", (req, res) => {
//   ///to add more data to the new obj
//   try {
//     const { id, name, passportID } = req.body;
//     console.log(id, name, passportID);
//     users.addUser({ id, name, passportID }); ///sends the whole object
//     res.send(users.getAllUsers());
//   } catch (err) {
//     console.log("err");
//   }
// });

////////////////////////////////////////////////////////////////////
// app.put("/accounts/:id", function (req, res) {
//   const { id } = req.params;
//   console.log(typeof id);
//   const { cash } = req.body;
//   console.log(typeof cash);
//   users.updateCash(id, cash);
//   res.send(users.getAllAccounts());
// });

// app.put("/accounts/", function (req, res) {    ///checked
//   const { accountID, cash, passportID } = req.body;
//   console.log(accountID, cash, passportID);
//   users.updateCash(accountID, cash, passportID);
//   res.send(users.getAllAccounts());
//   res.send(users.getAllUsers());
// });
///////////////////////////////////////////////

// app.put("/accounts/", function (req, res) {///checked
//   const { accountID, credit, passportID } = req.body;
//   console.log(accountID, credit, passportID);
//   if (credit > 0) {
//     users.updateCredit(accountID, credit, passportID);
//     res.send(users.getAllAccounts());
//     res.send(users.getAllUsers());
//   } else {
//     res.send("Please enter a positive number");
//   }
// });
///////////////////////////////////////////////////////////////////////////

// app.put("/accounts/", function (req, res) {  ///checked
//   try {
//     const { accountID, withdraw, passportID } = req.body;
//     console.log(accountID, withdraw, passportID);
//     users.updateFromWithdraw(accountID, withdraw, passportID);
//     res.send(users.getAllAccounts());
//     res.send(users.getAllUsers());
//   } catch (error) {
//     console.log(error);
//   }
// });

app.put("/accounts/", function (req, res) {
  ///checked
  try {
    const { accountID, transfer, passportID1, passportID2 } = req.body;
    // console.log(accountID, transfer, passportID1, passportID2);
    // users.updateTransaction(accountID, transfer, passportID1, passportID2);
    res.send(
      users.updateTransaction(accountID, transfer, passportID1, passportID2)
    );
    // res.send(users.getAllAccounts());
    // res.send(users.getAllUsers());
  } catch (error) {
    console.log(error);
  }
});
