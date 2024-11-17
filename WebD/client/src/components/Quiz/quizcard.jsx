import React from "react";

const QuizCard = ({ question, flip, handleFlip }) => {
  const que = question.question;
  const answer = question.answer;

  return (
    <>
      <div className="quiz-card-container" onClick={handleFlip}>
        {flip ? (
          <div className="question">
            {answer}
          </div>
        ) : (
          <div className="question">
            {que}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizCard;
