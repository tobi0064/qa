import React, {Component} from 'react';
import Questions from './Questions';
import Question from './Question';
import { Router } from "@reach/router";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const url = `${this.API_URL}/questions`;
        const result = await fetch(url);
        let json = await result.json();
        return this.setState({
            questions: json
        })
    }

    getQuestion(id) {
        const question = this.state.questions.find(q => q.id === parseFloat(id));
        return question;
    }
    putVote(questionId, answerId) {
        const url = `${this.API_URL}/questions/`
            .concat(questionId)
            .concat("/answers/")
            .concat(answerId)
            .concat("/votes");
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("result of upvoting");
                console.log(json);
                this.getData();
            });

        this.getData();
    }

    handleVote(questionId, answerId) {
        //PUT
        this.putVote(questionId, answerId);
        console.log("The link was clicked.");
    }


    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `${this.API_URL}/questions/${id}/answers`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text,
                //answers: []
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);

    }
    askQuestion(text) {

        this.postData(text);
    }

    //Post method to post a new question
    postData(text) {
        const url = `${this.API_URL}/questions`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: text,
                array: []
            }),

        })
            .then(response => response.json())
            .then(json => {

                console.log(json);

                console.log("Result of posting a new question:");
                console.log(json.question.question)
                this.getData();
            });


    }

    render() {
        return (
            <>
                <h1 style={{textAlign: "center", color: "red", fontSize:"3em"}}> Simple Q&A Site</h1>
                <h2 style={{textAlign: "center", fontSize:"2.5em"}}>Questions</h2>
                <Router>
                    <Questions path="/"
                               questions={this.state.questions}
                               askQuestion={question => this.askQuestion(question)}
                    ></Questions>
                    <Question path="/question/:id"
                              getQuestion={id => this.getQuestion(id)}
                              handleVote={(questionId, answerId) =>
                                  this.handleVote(questionId, answerId)
                              }
                              postAnswer={(id, text) => this.postAnswer(id, text)}
                    ></Question>
                    {/*<AskQuestion path="/new" add={ (title, description) => this.addQuestion(title, description)}></AskQuestion>*/}
                </Router>
            </>
        );
    }
}

export default App;

