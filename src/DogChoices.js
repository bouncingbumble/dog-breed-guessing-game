import React from 'react';

const DogChoices = props => {
    let options = props.options || []
    const {handleChange, handleSubmit} = props;
    let inputs = options.map((opt, i) => ( 
        <label key={i}>
            <input type="radio"
                    value={opt.breed}
                    checked={opt.checked}
                    onChange={handleChange}
                    name="dog-choice" />
            {opt.breed}        
        </label>
    ));

    return (
        <form className="dog-form" onSubmit={handleSubmit}>
        <div className="inputs">
        {inputs}
        </div>
        <button type="submit">pick your dog</button>
        </form>
    )
}

export default DogChoices;