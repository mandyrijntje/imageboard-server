const express = require("express");
// const auth = require("../auth/middleware");
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

router.delete("/images/:id", (req, res, next) =>
  Image.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next)
);

module.exports = router;
