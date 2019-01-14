import React from 'react';

const DogAnswer = ({correct, answer, onNext}) => (
    <div className='pup'>
        {correct ? 
            `Correct!: ${answer}` :
            `Incorrect! Correct Answer: ${answer}`
        }
        <button onClick={onNext}>next</button>
    </div>
)

export default DogAnswer;