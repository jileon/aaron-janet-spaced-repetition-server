const express = require("express");
const Question = require("../models/question");
const router = express.Router();

router.get("/", (req, res) => {
  Question.find()
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
    q1: {
        q: 'Buenos días',
        a: 'Good morning'
    },
    q2: {
        q: 'Hola',
        a: 'Hello'
    },
    q3: {
        q: 'Amor',
        a: 'Love'
    },
    q4: {
        q: 'Felicidad',
        a: 'Happiness'
    },
    q5: {
        q: 'Gato',
        a: 'Cat'
    },
    q6: {
        q: 'Perro',
        a: 'Dog'
    },
    q7: {
        q: 'Sí',
        a: 'Yes'
    },
    q8: {
        q: 'Gracias',
        a: 'Thank you'
    },
    q9: {
        q: 'Adiós',
        a: 'Goodbye'
    },
    q10:{
        q: 'Español',
        a: 'Spanish'
    },
  };

  return Question.create(newObj)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`);
      res.status(201).json(results);
    })

    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
    });
});

module.exports = router;