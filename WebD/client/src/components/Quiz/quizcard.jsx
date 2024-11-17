import React, { useState } from "react";

const QuizCard = ({question}) => {
    const que = question.question
    const answer = question.answer;

    const [flip, setFlip] = useState(true);

    const handleFlip = () => {
        setFlip(!flip)
    }

    return (
        <>
            <div className="quiz-card-container" onClick={handleFlip}>

                {flip && <div className="question">
                    {que}
                </div>}

                {!flip && <div className="question">
                    {answer}    
                </div>}

            </div>
        </>
    )
}

export default QuizCard