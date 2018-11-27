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
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  
  const newObj = {
    questions: 0,
    correct: 0,
    incorrect: 0,
    q1: {
      M: 1
    },
    q2: {
      M: 1
    },
    q3: {
      M: 1
    },
    q4: {
      M: 1
    },
    q5: {
      M: 1
    },
    q6: {
      M: 1
    },
    q7: {
      M: 1
    },
    q8: {
      M: 1
    },
    q9: {
      M: 1
    },
    q10: {
      M: 1
    },
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
    incorrect: req.body.incorrect,
    q1: {
      M: req.body.q1.M
    },
    q2: {
      M: req.body.q2.M
    },
    q3: {
      M: req.body.q3.M
    },
    q4: {
      M: req.body.q4.M
    },
    q5: {
      M: req.body.q5.M
    },
    q6: {
      M: req.body.q6.M
    },
    q7: {
      M: req.body.q7.M
    },
    q8: {
      M: req.body.q8.M
    },
    q9: {
      M: req.body.q9.M
    },
    q10: {
      M: req.body.q10.M
    },
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