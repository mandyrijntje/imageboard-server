const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

router.post("/users", (req, res, next) => {
  const userCredentials = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  if (!userCredentials.email || !userCredentials.password) {
    res.status(400).send({
      message: "Please supply a valid email and/or password"
    });
  } else {
    User.create(userCredentials) //req body is replaced by your const
      .then(user => {
        res.json(user);
      })
      .catch(next); //catch comes after last then
  }
});

// router.post("/users", async (req, res, next) => {
//     try {
//       const userCredentials = {
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 10)
//       };
//       if (!userCredentials.email || !userCredentials.password) {
//         res.status(400).send({
//           message: "Please supply a valid email and password"
//         });
//       } else {
//         const createUser = await User.create(userCredentials);
//         res.send(createUser);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });

module.exports = router;
