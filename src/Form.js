import React, { Component } from 'react';

class Form extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (<form>
            <input type="radio" name="gender" value="male" checked/> Male
            <input type="radio" name="gender" value="female"/> Female
            <input type="radio" name="gender" value="other"/> Other  
            <input type="radio" name="gender" value="other"/> Other  
          </form> )
    }
}

export default Form;