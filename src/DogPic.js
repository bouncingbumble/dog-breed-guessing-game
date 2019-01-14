import React, { Component } from 'react';

class DogPic extends Component {
    constructor(props){
        super(props);

    }

    render(){
        let {url} = this.props;
        return (<img className='dogpic' src={url} alt=""></img>)
    }
}

export default DogPic;