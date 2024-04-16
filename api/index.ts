const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { syncronize } = require("./utils/syncronize");
const { connectToDB } = require("./services/db.service");

import {
  readMany,
  readOne,
  create,
  update,
  remove,
  search,
} from "./contact.controller";
import { verifyToken } from "./utils/verifyToken";
app.use(cors());
app.use(bodyParser.json());
app.get("/contacts", verifyToken, readMany);
app.post("/contacts", verifyToken, create);
app.get("/contacts/:id", verifyToken, readOne);
app.put("/contacts/:id", verifyToken, update);
app.delete("/contacts/:id", verifyToken, remove);
app.get("/search", search);
app.listen(4000, async () => {
  connectToDB();
  await syncronize();
  console.log("Listening on 4000");
});
