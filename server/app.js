const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const cors=require('cors');
//Connection
const port = 4000;
const schema = require("./schema/schema");
const mongoose = require("mongoose");
//Connection String
mongoose.connect(
  "mongodb+srv://sabeeha:T3MTbKcn21siSW32@cluster0.n89ymm4.mongodb.net/myuser"
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});
app.use(cors())
//This is basically a middleware for "graphql" and adding schemas here
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
