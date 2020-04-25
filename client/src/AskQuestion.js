import React, {Component} from 'react';



export default class AskQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        this.props.askQuestion(this.state.input);
    }

    render() {
        return (
            <>


                    <div className="form-group">

                        <input name="input" onChange={(event) => this.onChange(event)}
                                type="text" placeholder="Ask a new question"
                        />
                        <button onClick={(event) => this.onSubmit(event)}>Ask question</button>
                    </div>


            </>
        );
    }
}