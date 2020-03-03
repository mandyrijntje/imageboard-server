const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

async function getUsers(req, res, next) {
  try {
    const fetchedUsers = await User.findAll();
    res.json(fetchedUsers);
  } catch (error) {
    next(error);
  }
}

router.get("/users", getUsers);

async function getUserById(req, res, next) {
  console.log("req.params.id :", typeof req.params.id);
  try {
    const fetchedUser = await Event.findByPk(req.params.id);
    if (!fetchedUser) {
      res.status(404).end();
    } else {
      res.json(fetchedUser);
    }
  } catch (error) {
    next(error);
  }
}

router.get("/users/:id", getUserById);

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
