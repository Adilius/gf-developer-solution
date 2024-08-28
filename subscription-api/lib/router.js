import express from "express";

import db from "./db.js";

const router = express.Router();

/* QUERY SCHEMA
{
  "order-id": string
}
*/

router.get("/subscription", (req, res) => {
  // Logging
  console.log(`GET /subscription - Fetching subscriptions for order ID: ${orderId}`);
  const { "order-id": orderId } = req.query;
  const existingSubscriptions = db.subscriptions.filter((sub) => sub.orderId === orderId);

  // Logging
  console.log(`GET /subscription - Returning data for existing subscriptions: ${existingSubscriptions}`);
  res.status(200).json({ data: existingSubscriptions });
});

/* BODY SCHEMA
{
  accountId: "string",
  productCode: "string",
  payment: {
    method: "string",
    token: "string",
  },
}
*/

router.post("/subscription", (req, res) => {
  const { accountId, orderId, productCode, payment: { method, token } } = req.body;

  const sameProductSubscription = db.subscriptions.find((sub) => sub.accountId === accountId && sub.productCode === productCode);
  if (sameProductSubscription) {
    return res.status(409).json({
      type: "subscription",
      id: sameProductSubscription.id,
      errors: [ {
        title: "Conflict",
        status: "conflict",
        details: `A subscription with account: ${accountId} and productCode: ${productCode} already exists`,
      } ],
    });
  }

  const id = `some-subscription-id-${db.subscriptions.length + 1}`;
  db.subscriptions.push({
    id,
    accountId,
    orderId,
    productCode,
    payment: {
      method,
      token,
    },
  });

  res.status(201).json({ type: "subscription", id });
});

export default router;
