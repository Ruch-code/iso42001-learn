import { useState } from 'react';
import type { QuizQuestion } from '../data/learningModules';
import Confetti from './Confetti';

interface QuizProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, lessonTitle, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQ];
  const isCorrect = selected === question?.correctAnswer;
  const score = answers.filter((a, i) => a === questions[i].correctAnswer).length;

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      const finalAnswers = [...newAnswers];
      finalAnswers[currentQ] = selected;
      const finalScore = finalAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
      setQuizComplete(true);
      onComplete(finalScore);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setSubmitted(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Confetti active={percentage >= 70} duration={4000} />
        <h3 className="text-xl font-bold mb-4">Quiz Complete: {lessonTitle}</h3>
        <div className={`text-center py-8 rounded-lg mb-4 ${
          percentage >= 70 ? 'bg-green-50' : 'bg-amber-50'
        }`}>
          <div className={`text-5xl font-bold mb-2 animate-pop-in ${
            percentage >= 70 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {score}/{questions.length}
          </div>
          <div className={`text-lg text-gray-600 ${percentage >= 70 ? 'animate-celebrate' : ''}`}>
            {percentage >= 70 ? '🎉 Great job! You passed.' : '📚 Keep studying and try again.'}
          </div>
          <div className="text-sm text-gray-500 mt-1">{percentage}% correct</div>
        </div>
        <div className="space-y-3 mb-6">
          {questions.map((q, i) => (
            <div key={q.id} className={`p-3 rounded-lg border ${
              answers[i] === q.correctAnswer 
                ? 'border-green-200 bg-green-50 animate-pop-in' 
                : 'border-red-200 bg-red-50 animate-shake'
            }`}>
              <div className="text-sm font-medium">{q.question}</div>
              <div className="text-xs mt-1 text-gray-600">
                Your answer: {q.options[answers[i] ?? 0]} {answers[i] === q.correctAnswer ? '✓' : '✗'}
              </div>
              {answers[i] !== q.correctAnswer && (
                <div className="text-xs mt-1 text-green-700">
                  Correct: {q.options[q.correctAnswer]}
                </div>
              )}
              <div className="text-xs mt-1 text-gray-500 italic">{q.explanation}</div>
            </div>
          ))}
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Quiz: {lessonTitle}</h3>
        <span className="text-sm text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-lg font-medium mb-4">{question.question}</p>

      <div className="space-y-2 mb-6">
        {question.options.map((option, index) => {
          let classes = 'w-full text-left p-3 rounded-lg border-2 transition-all text-sm ';
          if (submitted) {
            if (index === question.correctAnswer) {
              classes += 'border-green-500 bg-green-50 text-green-800';
            } else if (index === selected && index !== question.correctAnswer) {
              classes += 'border-red-500 bg-red-50 text-red-800';
            } else {
              classes += 'border-gray-200 bg-gray-50 text-gray-500';
            }
          } else if (index === selected) {
            classes += 'border-blue-500 bg-blue-50 text-blue-800';
          } else {
            classes += 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
          }
          return (
            <button key={index} onClick={() => handleSelect(index)} className={classes}>
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <div className={`font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div className="text-sm text-gray-600">{question.explanation}</div>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}