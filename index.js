const express = require("express");
const cors = require("cors");

const router = require("../ToDo - Nodejs/src/routes/router.js");

const app = express()
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
  console.log("A aplicação está rodando na porta 4000");
});

app.get("/", (request, response) => {
  response.send("Not found (404)");
});
