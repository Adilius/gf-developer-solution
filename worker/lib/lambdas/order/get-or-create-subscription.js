export default async function getOrCreateSubscription(message, context) {
  const { rejectUnless, http, findOrReject } = context;
  const { productCode, payment } = message;

  const accountId = findOrReject(message.data, "account", "id");

  // YOUR CODE HERE
  //console.log(message);

  const subscriptionResponse = await http.asserted.post({
    path: "/subscription",
    body: {
      accountId: accountId,
      orderID: message.orderID,
      productCode: productCode,
      payment: payment
    }
  });


  rejectUnless(subscriptionResponse?.id?.length, `There's already a subscription with id: ${subscriptionResponse?.id}`);
  console.log(`Created a subscription ${subscriptionResponse.id} for account ${accountId}`);

  // WE RETURN THE SUBSCRIPTION HERE FOR TRACEABILITY
  return { type: "subscription", id: subscriptionResponse.id };
}
