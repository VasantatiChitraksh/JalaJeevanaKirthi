import React, { useState } from "react";
import QuizCard from "./quizcard";
import './quiz.css'

const Quiz = () => {

    const questions = [
        {
          question: "What is the capital of France?",
          answer: "Paris"
        },
        {
          question: "Who painted the Mona Lisa?",
          answer: "Leonardo da Vinci"
        },
        {
          question: "What is the largest planet in our solar system?",
          answer: "Jupiter"
        },
        {
          question: "What is the tallest mountain in the world?",
          answer: "Mount Everest"
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          answer: "William Shakespeare"
        }
      ];
      

    const [questionId, setQuestionId] = useState(0);

    const prevQuestion = () => {
        if(questionId == 0){
            setQuestionId(questions.length-1);
        }else{
            setQuestionId(questionId-1);
        }
    }
    const nextQuestion = () => {
        if(questionId == questions.length-1){
            setQuestionId(0);
        }else{
            setQuestionId(questionId+1);
        }
    }

    return (
        <>
            <div className="main-quiz">
                <div className="navigate-arrow" onClick={prevQuestion}> ← </div>
                <QuizCard question={questions[questionId]}/>
                <div className="navigate-arrow" onClick={nextQuestion}> → </div>
            </div>
        </>
    )
}

export default Quiz;