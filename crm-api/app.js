import express from "express";
import router from "./lib/router.js";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT);
console.log(`CRM API listening on port ${PORT}`);
