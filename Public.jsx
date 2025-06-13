
import React, { useState, useEffect } from 'react';

function Public() {
  const [questions, setQuestions] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [answerIndex, setAnswerIndex] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  useEffect(() => {
    const allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    const disciplines = Array.from(new Set(allQuestions.map(q => q.discipline)));
    setSelectedDiscipline(disciplines[0] || '');
  }, []);

  useEffect(() => {
    if (selectedDiscipline) {
      const all = JSON.parse(localStorage.getItem('questions') || '[]');
      const filtered = all.filter(q => q.discipline === selectedDiscipline);
      setQuestions(shuffleArray(filtered).slice(0, 5));
      setAnswerIndex({});
      setShowFeedback({});
    }
  }, [selectedDiscipline]);

  const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

  const handleAnswer = (qIdx, optIdx) => {
    setAnswerIndex({ ...answerIndex, [qIdx]: optIdx });
    setShowFeedback({ ...showFeedback, [qIdx]: true });
  };

  const allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
  const disciplines = Array.from(new Set(allQuestions.map(q => q.discipline)));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Questões</h1>
      <select
        className="p-2 border mb-4"
        value={selectedDiscipline}
        onChange={(e) => setSelectedDiscipline(e.target.value)}
      >
        {disciplines.map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>
      {questions.map((q, i) => (
        <div key={i} className="mb-6 border p-4 rounded shadow">
          <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
          {q.options.map((opt, j) => (
            <button
              key={j}
              className={`block w-full text-left px-4 py-2 mb-1 rounded border 
                ${showFeedback[i] && j === q.correctIndex ? 'bg-green-100' : ''} 
                ${showFeedback[i] && answerIndex[i] === j && j !== q.correctIndex ? 'bg-red-100' : ''}`}
              onClick={() => handleAnswer(i, j)}
              disabled={showFeedback[i]}
            >
              {String.fromCharCode(65 + j)}. {opt}
            </button>
          ))}
          {showFeedback[i] && (
            <p className="mt-2 text-sm italic text-gray-600">
              {answerIndex[i] === q.correctIndex ? '✅ Correto!' : '❌ Errado.'} {q.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Public;
