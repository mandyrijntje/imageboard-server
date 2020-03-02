const express = require("express");
const Post = require("./post/model"); //dont need to import db because model imports db!
const postRouter = require("./post/router");
const app = express();
const port = process.env.PORT || 4000;

const parser = express.json(); //dont need to install body parser.
app.use(parser); //parser needs to be before ROUTER!

app.use(postRouter);
app.get("/data", (request, response) => {
  response.send("SOME DAta");
});

app.listen(port, () => console.log("The app is running on port:", port));
