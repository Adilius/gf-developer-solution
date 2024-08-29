export default async function validate(message, context) {
  const { http, rejectIf } = context;

  const order = message;
  console.log(`validate.js order:`)
  console.log(order); 

  const orderSubscriptions = await http.asserted.get({
    path: "/subscription",
    qs: { "order-id": order.id }
  });

  console.log(`validate.js /subscription call - Return data: ${JSON.stringify(orderSubscriptions)}`);
  rejectIf(orderSubscriptions?.data?.length, `There's already an existing subscription for order with id: ${order.id}`);
  
  return;
}
