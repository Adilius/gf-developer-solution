export default async function getOrCreateSubscription(message, context) {
  const { rejectUnless, http, findOrReject } = context;
  const { productCode, payment } = message;

  const accountId = findOrReject(message.data, "account", "id");

  // YOUR CODE HERE
  //console.log(`Message:`);
  //console.log(message);

  const subscriptionResponse = await http.asserted.post({
    path: "/subscription",
    body: {
      accountId: accountId,
      orderID: message.orderID,
      productCode: message.productCode,
      payment: {
        method: message.payment.method,
        token: message.payment.token
      }
    }
  });
  //console.log(subscriptionResponse);


  // WE RETURN THE SUBSCRIPTION HERE FOR TRACEABILITY
  return { type: "subscription", id: subscriptionResponse.id };
}
