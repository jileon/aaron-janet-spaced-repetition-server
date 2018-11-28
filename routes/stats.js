const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");

router.use(
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res, next) => {
  let userId = req.user.id;
  Stat.find({ userId: userId })
    .then(response => {
      let results = response[0]
      let q = results.head;
      return {
        correct: results.correct,
        incorrect: results.incorrect,
        question: results.questions[q],
        head: results.head,
        userId: results.userId
      }
    }) .then (results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


//   head 1
//   original q, memory * 2 and next is m + 1
//   position 2, change next to position of original q

// "username": "test12",
//     "id": "5bfebd147eac3057a4d10ebc"


router.post("/", (req, res, next) => {
  const newObj = {
    correct: 0,
    incorrect: 0,
    questions: [
      {
        question: "Buenos días",
        answer: "Good morning",
        memoryStrength: 1,
        next: 1
      },
      {
        question: "Hola",
        answer: "Hello",
        memoryStrength: 1,
        next: 2
      },
      {
        question: "Amor",
        answer: "Love",
        memoryStrength: 1,
        next: 3
      },
      {
        question: "Felicidad",
        answer: "Happiness",
        memoryStrength: 1,
        next: 4
      },
      {
        question: "Gato",
        answer: "Cat",
        memoryStrength: 1,
        next: 5
      },
      {
        question: "Perro",
        answer: "Dog",
        memoryStrength: 1,
        next: 6
      },
      {
        question: "Sí",
        answer: "Yes",
        memoryStrength: 1,
        next: 7
      },
      {
        question: "Gracias",
        answer: "Thank you",
        memoryStrength: 1,
        next: 8
      },
      {
        question: "Adiós",
        answer: "Goodbye",
        memoryStrength: 1,
        next: 9
      },
      {
        question: "Español",
        answer: "Spanish",
        memoryStrength: 1,
        next: 0
      }
    ],
    head: 0,
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

  // correct, incorrect

  // old head, old m and old next

  // new head value, should be questions old next value
  // question position and new m / next
  
  // whatever new next is, find the item that has that next
  // replace that items next with original questions position in the array
  
  if (req.body.correct === "1" || req.body.correct === 1) {
    Stat.find({ userId: userId })
      .then(results => {
        let oldData = results[0];
        return oldData;
      })
      .then(oldData => {
        let newObj = {
          correct: oldData.correct + 1,
          incorrect: oldData.incorrect
        };

        // array position  === head
        // new m value and next for that position  
          // if correct,  m === old m + 1, next === m + 1
          // if incorrect, m === 1, next === m + 1 (2), change B's next to 0
        // new next for a different changed position 

        return Stat.findOneAndUpdate({ userId: id }, newObj, { new: true })
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
  if (req.body.incorrect === "1" || req.body.incorrect === 1) {
    Stat.find({ userId: userId })
      .then(results => {
        let oldData = results[0];
        return oldData;
      })
      .then(oldData => {
        let newObj = {
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

module.exports = router;
