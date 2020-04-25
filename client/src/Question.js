import React, {Component} from 'react';
import PostAnswer from './PostAnswer';

class Question extends Component {
    constructor(props){
        super(props);
        this.handleVote = this.handleVote.bind(this);
    }

    handleVote(event) {

        let answerId = event.currentTarget.dataset.id;
        //console.log("answerid", answerId);
        this.props.handleVote(this.props.id, answerId);



    }
    render() {
        const id = this.props.id;
        const question = this.props.getQuestion(id);

        let content = "Loading";
        let answers = [];
        if (question) {
            content = question.question;
            if(question.answers){
                answers = question.answers.map((answer,id) =>
                    <div key={answer.id} id={answer.id}>
                        <br />
                        <div>{answer.text}</div>
                        <div>Up votes: {answer.votes}</div>

                        <button onClick={() => this.props.handleVote(this.props.id, answer.id)}>Vote up</button>

                    </div>


                );
            }
        }

        return (
            <>
                <h2>Question</h2>
                <p>{content}</p>
                <h3>Answers</h3>
                <form>
                    <ul>
                        {answers}
                    </ul>
                </form>

                {/* PostAnswer */}
                <PostAnswer id={id} postAnswer={(id, text) => this.props.postAnswer(id, text)}/>
            </>
        );
    }
}

export default Question;

