const { Router } = require("express");
const auth = require("./middleware");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("./jwt");
const router = new Router();

router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  console.log("E", req.body.email);
  const password = req.body.password;
  console.log("E", req.body.password);
  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(requiredUser => {
        if (!requiredUser) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, requiredUser.password)) {
          //compareSync is unique fn of bcrypt
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: requiredUser.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

module.exports = router;
