export default async function validate(message, context) {
  const { http, rejectIf } = context;

  const order = message;
  //console.log(`validate.js order:`)
  //console.log(order); 

  const orderSubscriptions = await http.asserted.get({
    path: "/subscription",
    qs: { "order-id": order.id }
  });

  rejectIf(orderSubscriptions?.data?.length, `There's already an existing subscription for order with id: ${order.id}`);
  //console.log(`No exisiting subscription for order with id: ${order.id}`);

  
  return;
}
