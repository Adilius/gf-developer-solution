# Greenfield developer solution

This is my solution to the [gf-developer-assessment](https://github.com/BonnierNews/gf-developer-assessment) where the background, task, and more information can be found.

## Install & Run

1. Start Docker
2. Within `/worker` directory create Docker image using `docker build -t worker-app .`
3. Run worker app using `docker run worker-app`


## The task

In the **worker** folder there's a test [sequence-feature](./worker/test/feature/order/sequence-feature.js) that doesn't work.
We are pretty sure that Jane knew what she was doing while writing the test, you can add logs as you see fit though!

The lambdas that needs some love is:
- [get-or-create-account](./worker/lib/lambdas/order/get-or-create-account.js)
- [get-or-create-subscription](./worker/lib/lambdas/order/get-or-create-subscription.js)

### Logs

After a test run the logs can be found in `./worker/logs/test.log`

### Idempotency

Please remember that these lambdas need to be idempontent, meaning that the state of the entity the lambda modifies should not be changed if it runs a second time with the same input.

### More info

This monorepo contains 3 different applications.
- **crm-api**, an application that handles customer data such as an account
- **subscription-api**, an application that handles subscriptions and payment methods
- **worker**, an application handling messages being pushed by google pubsub
