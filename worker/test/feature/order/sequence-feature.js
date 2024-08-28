import {
  fakePubSub,
  fakeApi as initFakeApi,
  runSequence,
  fakeGcpAuth
} from "@bonniernews/lu-test";

import app from "../../../app.js";
import manifest from "../../data/manifest.js";

const fakeApi = initFakeApi();

Feature("Sequence Feature", () => {
  beforeEachScenario(() => {
    fakePubSub.reset();
    fakeApi.reset();
    fakeGcpAuth.enableGetRequestHeaders();
  });
  Scenario("Processing an order", () => {

    // Intercepts POST request to /account
    // Store POST body in accountBody
    // Responding with 201 and predefined response manifest.account.body
    let accountBody;
    Given("we can talk to crm-api", () => {
      fakeApi
        .post("/account", (body) => (accountBody = body))
        .reply(201, manifest.account.body);
    });


    // Intercept GET and POST request to /subscription
    // GET: Query sent is order-id from the predefined manifest.message.is
    // And returns empty data array
    // POST: Store POST boy in subscriptionBody
    // Respond with predefined manifest.subscription.body
    let subscriptionBody;
    And("we can talk to subscription-api", () => {
      fakeApi
        .get("/subscription")
        .query({"order-id": manifest.message.id})
        .reply(200, { data: [] });

      fakeApi
        .post("/subscription", (body) => (subscriptionBody = body))
        .reply(201, manifest.subscription.body);
    });

    // Invoke the order sequence using message which is the manifest
    // Return value is stored in last
    let last;
    When("we invoke the sequence", async () => {
      const { message } = manifest;
      last = await runSequence(
        app,
        "trigger.sequence.order",
        message
      );
    });

    // Verifies the outcome of sequence order
    Then("we should get a processed message", () => {
      last.message.should.eql({
        ...manifest.message,
        data: [
          {
            type: "account",
            id: "some-account-id",
          },
          {
            type: "subscription",
            id: "some-subscription-id",
          },
        ],
      });
    });

    // Check that account data sent to CRM-API
    // Matches expected data in manifest
    And("we should have posted the correct account to crm-api", () => {
      accountBody.should.eql(manifest.account.request.body);
    });

    // Check that subscription data sent to subscription-API
    // Matches expected data in manifest
    And(
      "we should have posted the correct subscription to subscription-api",
      () => {
        subscriptionBody.should.eql(manifest.subscription.request.body);
      }
    );
  });
});
