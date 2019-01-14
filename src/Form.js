import React, { Component } from 'react';
import DogAnswer from './DogAnswer';
import DogChoices from './DogChoices';
import DogPic from './DogPic';

const QuestionStates = {
    QUESTION: 0,
    ANSWER_WRONG: 1,
    ANSWER_CORRECT: 3
  }

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            userChoice: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({userChoice: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onGuess(this.state.userChoice);
    }

    render(){
        const {
            questionState,
            options,
            answerText,
            onNext,
            img,
        } = this.props;

        const {userChoice} = this.state;

        let opts = options.map(opt => ({
            ...opt,
            checked: opt.breed === userChoice
        }));

        let output = questionState === QuestionStates.QUESTION  ?
            (<DogChoices handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        options={opts} />)                      :
            (<DogAnswer correct={questionState === QuestionStates.ANSWER_CORRECT}
                        answer={answerText}
                        onNext={onNext} />);
    
        return (
            <div>
                <DogPic img={img}/>
                <div className='content'>
                    {output}
                </div>
            </div>
        );  
    }
}

export default Form;