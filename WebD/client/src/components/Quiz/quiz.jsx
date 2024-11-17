import React, { useState } from "react";
import QuizCard from "./quizcard";
import './quiz.css';
import Fishes from "../Fish/fish";

const Quizes = () => {
  const questions = [
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean"
    },
    {
      question: "Which ocean is known as the 'Southern Ocean'?",
      answer: "Antarctic Ocean"
    },
    {
      question: "What is the deepest point in the ocean called?",
      answer: "Mariana Trench"
    },
    {
      question: "Which fish is known for its ability to generate electric shocks?",
      answer: "Electric Eel"
    },
    {
      question: "What causes tides in the ocean?",
      answer: "The gravitational pull of the moon and the sun"
    },
    {
      question: "What percentage of the Earth's surface is covered by oceans?",
      answer: "About 71%"
    },
    {
      question: "What is the primary cause of ocean currents?",
      answer: "Wind and the Earth's rotation"
    },
    {
      question: "What is the term for tiny marine organisms that drift with ocean currents?",
      answer: "Plankton"
    },
    {
      question: "What is the name of the ocean zone where sunlight does not reach?",
      answer: "Aphotic Zone"
    },
    {
      question: "Which ocean is the warmest?",
      answer: "Indian Ocean"
    },
    {
      question: "What is the process by which salt is removed from seawater?",
      answer: "Desalination"
    },
    {
      question: "What is the largest animal in the ocean?",
      answer: "Blue Whale"
    },
    {
      question: "What is the name of the underwater mountain range in the Atlantic Ocean?",
      answer: "Mid-Atlantic Ridge"
    },
    {
      question: "Which ocean has the most coral reefs?",
      answer: "Pacific Ocean"
    },
    {
      question: "What is the term for a circular ocean current?",
      answer: "Gyre"
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
