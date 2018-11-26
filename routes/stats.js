const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");

router.use(
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res) => {
  console.log(req.user);
  let userId = req.user.id;
  Stat.find({ userId: userId })
    .select(
      "questions correct incorrect username"
    )
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// 5bfc4ec26bd30d41e4a12a35

router.post("/", (req, res, next) => {
  console.log(req.body);
  const newObj = {
    questions: "0",
    correct: "0",
    incorrect: "0",
    userId: req.body.userId,
    username: req.body.username
  };

  return Stat.create(newObj)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`);
      res.status(201).json(results);
    })

    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newObj = {
    questions: req.body.questions,
    correct: req.body.correct,
    incorrect: req.body.incorrect
  };
  return Stat.findOneAndUpdate({ _id: id }, newObj, { new: true })
    .select("questions correct incorrect")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;