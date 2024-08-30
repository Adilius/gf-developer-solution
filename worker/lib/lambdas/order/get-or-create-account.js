import account from "../../../test/data/account.js";

export default async function getOrCreateAccount(message, context) {
  const { http, rejectUnless } = context;
  const order = message;

  // YOUR CODE HERE
  //console.log(`order: ${JSON.stringify(order)}`);

const accountID = await http.asserted.post({
  path: "/account",
  body: {
    email: order.email,
    firstName: order.firstName,
    lastName: order.lastName,
    phoneNumber: order.phoneNumber
  }
});
  
rejectUnless(accountID?.id?.length, `There's already an existing account with id: ${accountID?.id}`);
//console.log(`Created an account with id: ${accountID.id}`);

  // THE NEXT LAMBDA WILL REQUIRE AN ACCOUNT AND IT'S ID THEREFOR WE RETURN IT.
  return { type: "account", id: accountID.id };
}
