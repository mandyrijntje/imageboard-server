const express = require("express");
const Image = require("./model");
const router = express.Router(); //getting router from express and assigning to var

router.get("/images", (req, res, next) => {
  Image.findAll()
    .then(list => res.json(list))
    .catch(next);
});

// router.post('/post', async (request, response, next)=>{try{const post = await Post.create({text: request.body.text})response.send(post)}catch(error){next(error)}})

module.exports = router;
