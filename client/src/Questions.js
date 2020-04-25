import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";

class Questions extends Component{




    render() {
        //Map the questions to the question component by using props
        //Pass the question id to the link path

        const mapFunction = (elm) =>
            <li key={elm.id} style={{textAlign: "center"}}>
                <Link style={{textDecoration: "none", fontSize:"2em"}} to={"/question/"+elm.id}> {elm.question}</Link>
            </li>;
        const list = this.props.questions.map(mapFunction);



        return(
            <div>

                <ul style={{listStyleType: "none"}}>
                    {list}
                </ul>

                <AskQuestion style={{textAlign: "center"}} askQuestion={(text) => this.props.askQuestion(text)}/>



            </div>



        );

    }
}

export default Questions;