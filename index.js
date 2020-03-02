const cors = require("cors");
const corsMiddleware = cors();

const express = require("express");
const Image = require("./image/model"); //dont need to import db because model imports db!
const imageRouter = require("./image/router");
const app = express();
const port = process.env.PORT || 4000;

const parser = express.json(); //dont need to install body parser.
app.use(corsMiddleware); //should be above all app.use!!!
app.use(parser); //parser needs to be before ROUTER!
app.use(imageRouter);

app.get("/data", (request, response) => {
  response.send("SOME DAta");
});

app.listen(port, () => console.log("The app is running on port:", port));
