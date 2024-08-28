export default async function getOrCreateAccount(message, context) {
  const { http, rejectUnless } = context;
  const order = message;

  // YOUR CODE HERE
  console.log(`http: ${http}`);
  console.log(`rejectUnless: ${rejectUnless}`);
  console.log(`order: ${order}`);

  // THE NEXT LAMBDA WILL REQUIRE AN ACCOUNT AND IT'S ID THEREFOR WE RETURN IT.
const accountExists = await http.asserted.get({
  path: "/account"
});
  

  return { type: "account", id };
}
