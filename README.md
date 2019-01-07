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

├── /login/auth
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
