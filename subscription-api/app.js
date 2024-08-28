import express from "express";
import router from "./lib/router.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT);
console.log(`Subscription API listening on port ${PORT}`);