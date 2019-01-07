# Learning Spanish

This is the server repo for https://learn-spanish-app.herokuapp.com

This is an application where you can learn some simple words in Spanish.

- You start with a Spanish word, and try to enter it's English equivalent
- If you get it right, great! Your stats will reflect your good work
- If you get it wrong, no worries! You'll have plenty of opportunities to redeem yourself

# Creators

- This application was built by full-stack developers Janet Leon and Aaron Whitehead

- It was built in one week using a spaced repetition algorithm
- Although we both worked on both the front and back end, Janet's primary focus was on the front-end and Aaron's on the back-end

- You can find more of Janet's work and contact information here: https://iamjanetleon.com
- You can find more of Aaron's work and contact information here: https://aaron-whitehead.herokuapp.com

# How do I play?

- Both the client and the server are live on Heroku.
- You can play here: https://learn-spanish-app.herokuapp.com
- Beware, the page might require a refresh, as it's using free dynos.
- You can create your own account, or use our demo account!
- Username: test
- Password: password123

If you do create your own account:

- Check out your stats by clicking on 'stats' on the computer screen
- Can you get more right than you get wrong?

# Technology Stacks

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)
- [mongoose](https://mongoosejs.com/)

### Installation

If you want to clone this repo and make changes for yourself, make sure you npm install in your terminal :)

Client repo can be found here https://github.com/thinkful-ei24/aaron-janet-spaced-repetition-client

### Code

- Disclaimer: This will be actively updated to clean the code up.
- All of our actions are in the actions folder.
- All of our reducers are in the reducers folder.
- All of our components are in the components folder.
- All of the CSS files, except for index.css, are located as ./src/components/css

## API Overview

```text

├── /login
│   └── POST
│       ├── /
│       └── /refresh
├── /stats
│   └── GET
│       └── /
│   └── PUT
│       └── /:id
│   └── POST
│       └── /
├── /users
│   └── POST
│       ├── /

```

### POST `/login/`

```js
// res.body
{
  username: String,
  password: String
}
```

### POST `/login/refresh`

```js
// req.header
Authorization: Bearer ${token}
// res.body

{
  authToken: ${token}
}
```

### GET `/stats/`

```js

userID: req.user.id

// req.header
Authorization: Bearer ${token}

// res.body
{
    correct: Integer,
    incorrect: Integer,
    question: {
        question: String,
        answer: String,
        memoryStrength: Integer,
        next: Integer,
        _id: String
    },
    head: Integer,
    userId: String
}
```

### GET `/stats/`

```js

userID: req.user.id

// req.header
Authorization: Bearer ${token}

// res.body
{
    correct: Integer,
    incorrect: Integer,
    question: {
        question: String,
        answer: String,
        memoryStrength: Integer,
        next: Integer,
        _id: String
    },
    head: Integer,
    userId: String
}
```

### POST `/stats`

Use this endpoint to seed your database.
This enpoind is not used on the client side.

```js
// req.header
Authorization: Bearer ${token}

// req.body
{
username: String,
password: String,
userId: String
}

// res.body
{
head: Integer,
correct: Integer,
incorrect: Integer,
questions: Array,
userId: String,
username: String,
createdAt: String
updatedAt: String,
id: String
}
```

### PUT `/:id`

```js
// req.header
Authorization: Bearer ${token}

// req.params.id
id: String

// req.user
userId: String
// req.body
{

    userId: "5c333005ea87b13f1680114a",
    correct: Integer,
    incorrect: Integer,
    head: Integer,
    question:{
    answer: String,
    memoryStrength: Integer,
    next: Integer,
    question: String
    _id: String
}
}

// res.body
{
    head: Integer,
    correct: Integer,
    incorrect: Integer,
    questions: [
        {
            question: String,
            answer: String,
            memoryStrength: Integer,
            next: Integer,
            _id: String
        }
    ],
    userId: String,
    username: String,
    createdAt: String,
    updatedAt: String,
    id: String
}
```
