/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**** Configuration ****/
const appName = "MERN Heroku Example";
const port = (process.env.PORT || 8080);
const app = express();
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all http requests to the console
app.use(express.static(buildPath)); // Serve React from build directory

app.use((req, res, next) => {
    // Additional headers for the response to avoid trigger CORS security errors in the browser
    // Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // Always respond with 200
      console.log("Allowing OPTIONS");
      res.send(200);
    } else {
      next();
    }
});

/**** Some test data ****/
const questions = [
    {
        id: 1,
        question: "How to add Bootstrap to React?",
        answers:[
            {id: 4, text: "first answer", votes: 1},
            {id: 5, text: "second answer", votes: 3},
            {id: 6, text: "third answer", votes: 2}

        ]
    },
    {
        id: 2,
        question: "Class vs Functions in React?",
        answers: [
            {id: 1, text: "first answer", votes: 7},
            {id: 2, text: "second answer", votes: 9},
            {id: 3, text: "third answer", votes: 200}
        ]
    },
];

/**** Routes ****/

// Return all recipes in data
app.get('/api/questions', (req, res) => res.json(questions));

app.get('/api/questions/:id', (req, res) => {
    const question = questions.find(q => q.id === parseFloat(req.params.id));
    res.json(question);
});

//AskQuestion
app.post('/api/questions', (req, res) => {
    let question = {
        id: Math.random(),
        question: req.body.question,
        answers: [{ text: String, votes: Number }],
    };

    questions.push(question)
    res.json({msg: "question added", question: question})
})
// PostAnswer
app.post('/api/questions/:id/answers', (req, res) => {
    let answer = {
        id: Math.random(),
        text: req.body.text,
        votes: 0
    }
    const question = questions.find(q => q.id ===parseFloat(req.params.id));
    question.answers.push(answer);
    console.log(answer);
    res.json({msg: "Answer added", question: question});
});

app.put('/api/questions/:id/answers/:aid/votes', (req, res) => {
    let answer = {
        aid: req.params.aid,
        text: req.params.text,
        votes: req.params.votes
    }
    const question = questions.find(q => q.id ===parseFloat(req.params.id));
    const ans = question.answers.find(a => a.id ===parseFloat(req.params.aid));
    ans.votes++;

    res.json({msg: "Answer upvoted", question: question});

});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));