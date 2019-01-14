import React, { Component } from 'react';
import Form from './Form';
import './App.css';

const QuestionStates = {
  QUESTION: 0,
  ANSWER_WRONG: 1,
  ANSWER_CORRECT: 3
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      dogs: [],
      options: [],
      goodBoi: undefined,
      questionState: undefined
    }

    this.onGuess = this.onGuess.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }
  
  componentDidMount(){
    const url = 'https://dog.ceo/api/breeds/image/random';
    
    let {dogs} = this.state;
    let promises = [];

    for(let i=0; i<40; i++){
      promises.push(
        fetch(url)
        .then(data => data.json())
        .then(data => dogs[i] = { 
          breed: data.message.split('/')[4], 
          img: data.message 
        }))
    }
    
    Promise.all(promises)
    .then(dogs => {
      console.log(dogs)
      const goodBoi = dogs[Math.floor(Math.random() * dogs.length)];
      const options = this._getOptions(goodBoi, dogs);    
      this.setState({
        dogs,
        goodBoi,
        options,
        questionState: QuestionStates.QUESTION,
      });
    })
    .catch(console.warn);
  }

  onGuess(answer) {
    console.log(answer)
    const {goodBoi} = this.state;
    let questionState = answer === goodBoi.breed ?
      QuestionStates.ANSWER_CORRECT :
      QuestionStates.ANSWER_WRONG;
    this.setState({questionState});
  }
  
  nextQuestion(){
    const {dogs} = this.state;
    const goodBoi = dogs[Math.floor(Math.random() * dogs.length)];
    const options = this._getOptions(goodBoi, dogs);
    this.setState({
      dogs,
      goodBoi,
      options,
      questionState: QuestionStates.QUESTION,
    });
  }

  _getOptions(goodBoi, dogs){
    let options = [goodBoi];
    while(options.length < 4){
      options.push(dogs[Math.floor(Math.random() * dogs.length)]);
    }

    return shuffle(options);
  }

  render() {
    let {
      goodBoi,
      options,
      questionState
    } = this.state;

    let output = <div>loading dog pic</div>

    if(goodBoi !== undefined){
      const {breed, img} = goodBoi;
      let opts = options.map(opt => {
        return {
          breed: opt.breed
        };
      });

      output = (
        <Form
          answerText={breed}
          onGuess={this.onGuess}
          onNext={this.nextQuestion}
          options={opts}
          questionState={questionState}
          img={img}
        />
      )
    }
    
    return (
      <div className="App">
        <div>
          <h1>What kind of dog is this?</h1>
        </div>
        {output}
      </div>
    );
  }
}

function shuffle(items){
  // To shuffle an array a of n elements (indices 0..n-1):
  // for i from n - 1 downto 1 do
  //      j = random integer with 0 <= j <= i
  //      exchange a[j] and a[i]
  console.log('hello')
  for(let i=items.length-1; i>=1; i--){
    let j = Math.floor(Math.random() * items.length);
    let box = items[j];
    let holdBox = items[i];
    items[i] = box;
    items[j] = holdBox;
  }

  return items;
}

export default App;
