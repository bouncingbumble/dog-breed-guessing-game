import React, { Component } from 'react';

class DogPic extends Component {
    constructor(props){
        super(props);

    }

    render(){
        let {img} = this.props;
        return (<img className='dogpic' src={img} alt=""></img>)
    }
}

export default DogPic;