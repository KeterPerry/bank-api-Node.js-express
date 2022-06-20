import fs from "fs";
import uniqid from "uniqid";

const getAllUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJson = dataBuffer.toString();
    const data = JSON.parse(dataJson);
    console.log(data);
    return data;
  } catch (e) {
    return [];
  }
};
/////////////////////////////////////////////////////
const getAllAccounts = () => {
  try {
    const dataBuffer = fs.readFileSync("accounts.json");
    const dataJson = dataBuffer.toString();
    const data = JSON.parse(dataJson);
    console.log(data);
    return data;
  } catch (e) {
    return [];
  }
};
//////////////////////////////////////////////////////////

const getUser = (id) => {
  const users = getAllUsers();
  const user = users.find((user) => user.id === id);

  if (user) {
    return user;
  }
  return false;
};

//////////////////////////////////////////////////////////

const save = (data) => {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync("users.json", dataJson);
};

////////////////////////////////////////////////////////////////////////////////////
const saveAccount = (data) => {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync("accounts.json", dataJson);
};

//////////////////////////////////////////////////////////////////////////////////////////////
const addUser = (newUser) => {
  const users = getAllUsers();
  const duplicateUsers = users.filter(
    (user) => user.passportID === newUser.passportID
  );
  if (duplicateUsers.length === 0) {
    users.push({ ...newUser, id: uniqid() });
    save(users);
  } else {
    console.log("passportID is already exist");
  }
};
//////////////////////////////////////////////////////////////////

const updateCash = (accountID, cash, passportID) => {
  const accounts = getAllAccounts();
  const users = getAllUsers();
  console.log(accounts);
  const accountIndex = accounts.findIndex(
    (account) => account.passportID === passportID
  );
  const userIndex = accounts.findIndex(
    (user) => user.passportID === passportID
  );

  if (accountIndex !== -1) {
    const accountObj = accounts.find(
      (account) => account.passportID === passportID
    );
    const usersObj = users.find((account) => account.passportID === passportID);
    const userAccount = usersObj.accounts.find(
      (account) => account.accountID === accountID
    );
    console.log(userAccount);

    userAccount.cash = accountObj.cash + cash;
    accountObj.cash = accountObj.cash + cash;

    const updatedAccout = { ...accounts[accountIndex] };
    const updatedUser = { ...users[userIndex] };
    accounts[accountIndex] = updatedAccout;
    users[userIndex] = updatedUser;
    saveAccount(accounts);
    save(users);
  } else {
    console.log("No account with that specific id");
  }
};

//////////////////////////////////////////////////////////////////////////////

const updateCredit = (accountID, credit, passportID) => {
  const accounts = getAllAccounts();
  const users = getAllUsers();
  console.log(accounts);
  const accountIndex = accounts.findIndex(
    (account) => account.passportID === passportID
  );
  const userIndex = accounts.findIndex(
    (user) => user.passportID === passportID
  );

  if (accountIndex !== -1) {
    const accountObj = accounts.find(
      (account) => account.passportID === passportID
    );
    const usersObj = users.find((account) => account.passportID === passportID);
    const userAccount = usersObj.accounts.find(
      (account) => account.accountID === accountID
    );
    console.log(userAccount);

    userAccount.credit = credit;
    accountObj.credit = credit;

    const updatedAccout = { ...accounts[accountIndex] };
    const updatedUser = { ...users[userIndex] };
    accounts[accountIndex] = updatedAccout;
    users[userIndex] = updatedUser;
    saveAccount(accounts);
    save(users);
  } else {
    console.log("No account with that specific id");
  }
};

///////////////////////////////////////////////////////////////////////

const updateFromWithdraw = (accountID, withdraw, passportID) => {
  const accounts = getAllAccounts();
  const users = getAllUsers();
  console.log(accounts);
  const accountIndex = accounts.findIndex(
    (account) => account.passportID === passportID
  );
  const userIndex = accounts.findIndex(
    (user) => user.passportID === passportID
  );

  if (accountIndex !== -1) {
    const accountObj = accounts.find(
      (account) => account.passportID === passportID
    );
    const usersObj = users.find((account) => account.passportID === passportID);
    const userAccount = usersObj.accounts.find(
      (account) => account.accountID === accountID
    );

    if (accountObj.cash * -1 <= accountObj.credit) {
      console.log(accountObj.cash);
      userAccount.cash = accountObj.cash - withdraw;
      accountObj.cash = accountObj.cash - withdraw;
      const updatedAccout = { ...accounts[accountIndex] };
      const updatedUser = { ...users[userIndex] };
      accounts[accountIndex] = updatedAccout;
      users[userIndex] = updatedUser;
      saveAccount(accounts);
      save(users);
      //   return updatedAccout;
    } else {
      throw new Error("You have reached your limit");
    }
  } else {
    console.log("No account with that specific id");
  }
};

// updateFromWithdraw("1", 10, "1234");

////////////////////////////////////////////////////////////////////////////

const updateTransaction = (accountID, transfer, passportID1, passportID2) => {
  const accounts = getAllAccounts();
  //   const users = getAllUsers();
  console.log(accounts);
  const accountIndex1 = accounts.findIndex(
    (account) => account.passportID === passportID1
  );
  const accountIndex2 = accounts.findIndex(
    (account) => account.passportID === passportID2
  );
  //   const userIndex = accounts.findIndex(
  //     (user) => user.passportID === passportID
  //   );

  if (accountIndex1 !== -1 && accountIndex2 !== -1) {
    const accountObj1 = accounts.find(
      (account) => account.passportID === passportID1
    );
    const accountObj2 = accounts.find(
      (account) => account.passportID === passportID2
    );
    // const usersObj = users.find((account) => account.passportID === passportID);
    // const userAccount = usersObj.accounts.find(
    //   (account) => account.accountID === accountID
    // );

    if (accountObj1.cash * -1 <= accountObj1.credit) {
      //   userAccount.cash = accountObj.cash - withdraw;
      accountObj1.cash = accountObj1.cash - transfer;
      const updatedAccout1 = { ...accounts[accountIndex1] };
      //   const updatedUser = { ...users[userIndex] };
      accounts[accountIndex1] = updatedAccout1;

      accountObj2.cash = accountObj2.cash + transfer;
      const updatedAccout2 = { ...accounts[accountIndex2] };
      accounts[accountIndex2] = updatedAccout2;

      //   users[userIndex] = updatedUser;
      saveAccount(accounts);
      return [updatedAccout2, updatedAccout1];
      //   save(users);
    } else {
      throw new Error("You have reached your limit");
    }
  } else {
    console.log("No account with that specific id");
  }
};

/////////////////////////////////////////////////////////////////
export default {
  getUser,
  getAllUsers,
  getAllAccounts,
  addUser,
  updateCash,
  updateCredit,
  updateFromWithdraw,
  updateTransaction,
};
