const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

router.use(
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res, next) => {
  let userId = req.user.id;
  Stat.find({ userId: userId })
    .then(response => {
      let results = response[0];
      let q = results.head;
      if (q > 9 || q < 0) {
        q = Math.floor(Math.random() * 10);
      }
      return {
        correct: results.correct,
        incorrect: results.incorrect,
        question: results.questions[q],
        head: results.head,
        userId: results.userId
      };
    })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//   head 1
//   original q, memory * 2 and next is m + 1
//   position 2, change next to position of original q

router.post("/", (req, res, next) => {
  const newObj = {
    correct: 0,
    incorrect: 0,
    questions: [
      {
        question: "Buenos días",
        answer: "Good morning",
        memoryStrength: 1,
        next: 1,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Hola",
        answer: "Hello",
        memoryStrength: 1,
        next: 2,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Amor",
        answer: "Love",
        memoryStrength: 1,
        next: 3,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Felicidad",
        answer: "Happiness",
        memoryStrength: 1,
        next: 4,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Gato",
        answer: "Cat",
        memoryStrength: 1,
        next: 5,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Perro",
        answer: "Dog",
        memoryStrength: 1,
        next: 6,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Sí",
        answer: "Yes",
        memoryStrength: 1,
        next: 7,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Gracias",
        answer: "Thank you",
        memoryStrength: 1,
        next: 8,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Adiós",
        answer: "Goodbye",
        memoryStrength: 1,
        next: 9,
        _id: mongoose.Types.ObjectId()
      },
      {
        question: "Español",
        answer: "Spanish",
        memoryStrength: 1,
        next: 0,
        _id: mongoose.Types.ObjectId()
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
    Stat.findOne({ userId: userId }).then(oldData => {
      let questions = oldData.questions;
      let newNext = Math.min(req.body.question.memoryStrength * 2, 8) + 1;
      let newHead = Math.min(req.body.question.next, 9);

      if (newNext === newHead) {
        if (newHead !== 9) {
          newHead = newHead + 1;
        } else {
          newHead = 0;
        }
      }

      let question = questions.find(item => {
        return item.next === newNext;
      });

      if (question) {
        if (question.next === 9 && newNext === 9) {
          question.next = Math.floor(math.random() * 10);
        } else {
          question.next = req.body.head;
        }
      }

      questions[req.body.head].next = newNext;
      questions[req.body.head].memoryStrength =
        questions[req.body.head].memoryStrength * 2;

      let newObj = {
        correct: oldData.correct + 1,
        incorrect: oldData.incorrect,
        questions,
        head: newHead,
        userId: oldData.userId,
        username: oldData.username
      };

      Stat.findOneAndUpdate({ userId: id }, newObj, { new: true })
        .then(results => {
          res.json(results);
        })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    });

    // array position  === head
    // new m value and next for that position
    // if correct,  m === old m + 1, next === m + 1
    // if incorrect, m === 1, next === m + 1 (2), change B's next to 0
    // new next for a different changed position
  }
  if (req.body.incorrect === "1" || req.body.incorrect === 1) {
    Stat.find({ userId: userId })
      .then(results => {
        let oldData = results[0];
        let questions = oldData.questions;
        let newNext = 2;
        let newHead = Math.min(oldData.questions[oldData.head].next, 9);
        if (newNext === newHead) {
          newHead = newHead + 1;
        }
        questions.forEach(item => {
          if (item.next === newNext) {
            item.next = req.body.head;
            return;
          }
        });
        questions[req.body.head].next = newNext;
        questions[req.body.head].memoryStrength = 1;
        return {
          oldData,
          questions,
          newHead
        };
      })
      .then(results => {
        const { oldData, questions, newHead } = results;
        let newObj = {
          correct: oldData.correct,
          incorrect: oldData.incorrect + 1,
          questions,
          head: newHead,
          userId: oldData.userId,
          username: oldData.username
        };

        Stat.findOneAndUpdate({ userId: id }, newObj, { new: true })
          .then(results => {
            res.json(results);
          })
          .then(() => {})
          .catch(err => {
            console.log(err);
          });
      });
  }
});

module.exports = router;
