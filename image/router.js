const express = require("express");
const Image = require("./model");
const router = express.Router(); //getting router from express and assigning to var

router.get("/images", (req, res, next) => {
  Image.findAll()
    .then(list => res.json(list))
    .catch(next);
});

router.post("/images", (req, res, next) => {
  console.log(req.body);
  Image.create(req.body)
    .then(image => {
      res.json(image);
    })

    .catch(next);
});

module.exports = router;
