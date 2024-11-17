import React, { useState } from "react";
import QuizCard from "./quizcard";
import './quiz.css';
import Fishes from "../Fish/fish";

const Quizes = () => {
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
  const [flip, setFlip] = useState(false); // Move flip state here

  const prevQuestion = () => {
    setFlip(false); // Reset flip state when navigating
    setQuestionId(questionId === 0 ? questions.length - 1 : questionId - 1);
  };

  const nextQuestion = () => {
    setFlip(false); // Reset flip state when navigating
    setQuestionId(questionId === questions.length - 1 ? 0 : questionId + 1);
  };

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <>
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/roleplay">Roleplay</a>
          </li>
          <li className="right">
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
      <div className="main-quiz">
        <div className="navigate-arrow" onClick={prevQuestion}> ← </div>
        <QuizCard question={questions[questionId]} flip={flip} handleFlip={handleFlip} />
        <div className="navigate-arrow" onClick={nextQuestion}> → </div>

        <Fishes />
      </div>
    </>
  );
};

export default Quizes;
