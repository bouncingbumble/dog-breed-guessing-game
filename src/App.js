import React, { Component } from 'react';
import DogPic from './DogPic';
import Form from './Form';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      dogs: []
    }
  }
  
  componentDidMount(){
    const url = 'https://dog.ceo/api/breeds/image/random';
    
    let {dogs} = this.state;
    let promises = [];

    for(let i=0; i<20; i++){
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

      this.setState({dogs})
    });
  }

  render() {
    const {dogs} = this.state;
    let dog = <div>loading dog pic</div>
    if(dogs && dogs.length > 0) {
      let randomDog = dogs[Math.floor(Math.random() * dogs.length)];
      dog = <DogPic url={randomDog.img} />
    }
    return (
      <div className="App">
        <div>
          <h1>What kind of dog is this?</h1>
        </div>
        {dog}
        <Form/>
      </div>
    );
  }
}

export default App;
