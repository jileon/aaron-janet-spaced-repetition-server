const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");

router.use(
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res) => {
  let userId = req.user.id;
  Stat.find({ userId: userId })
    .then(results => {
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
    // q1: 1,
    // q2: 1,
    // q3: 1,
    // q4: 1,
    // q5: 1,
    // q6: 1,
    // q7: 1,
    // q8: 1,
    // q9: 1,
    // q10: 1,
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
  let userId = req.user.id;
  console.log(req.body);
  if (req.body.correct === '1' || req.body.correct === 1) {
    Stat.find({ userId: userId })
      .then(results => {
        let oldData = results[0];
        return oldData;
      })
      .then(oldData => {
        let newObj = {
          questions: oldData.questions + 1,
          correct: oldData.correct + 1,
          incorrect: oldData.incorrect
        };
        return Stat.findOneAndUpdate({ userId: id }, newObj, { new: true })
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
  if (req.body.incorrect === '1' || req.body.incorrect === 1) {
    Stat.find({ userId: userId })
      .then(results => {
        let oldData = results[0];
        return oldData;
      })
      .then(oldData => {
        let newObj = {
          questions: oldData.questions + 1,
          correct: oldData.correct,
          incorrect: oldData.incorrect + 1
        };
        return Stat.findOneAndUpdate({ userId: id }, newObj, { new: true })
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
});

// {
// 	"questions": "10",
//     "correct": "6",
//     "incorrect": "4",
//     "q1": "1",
//     "q2": "1",
//     "q3": "1",
//     "q4": "1",
//     "q5": "1",
//     "q6": "1",
//     "q7": "1",
//     "q8": "1",
//     "q9": "1",
//     "q10": "1"
// }

// "username": "testaaron",
// "id": "5bfd99faa841b737c0f339f2"

module.exports = router;
