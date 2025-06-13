
import React, { useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [discipline, setDiscipline] = useState('');
  const [comment, setComment] = useState('');

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const saveQuestion = () => {
    const existing = JSON.parse(localStorage.getItem('questions') || '[]');
    const newQuestion = {
      question,
      options,
      correctIndex,
      discipline,
      comment,
    };
    localStorage.setItem('questions', JSON.stringify([...existing, newQuestion]));
    alert('Questão salva!');
  };

  if (!authenticated) {
    return (
      <div className="p-6 max-w-sm mx-auto mt-10 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login do Administrador</h2>
        <input
          type="text"
          placeholder="Usuário"
          className="w-full p-2 border mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Nova Questão</h1>
      <input
        type="text"
        placeholder="Enunciado"
        className="w-full p-2 border mb-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
          className="w-full p-2 border mb-2"
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}
      <label className="block mb-2">
        Alternativa Correta:
        <select value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))}>
          {options.map((_, i) => (
            <option key={i} value={i}>{String.fromCharCode(65 + i)}</option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Disciplina"
        className="w-full p-2 border mb-2"
        value={discipline}
        onChange={(e) => setDiscipline(e.target.value)}
      />
      <textarea
        placeholder="Comentário para feedback"
        className="w-full p-2 border mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={saveQuestion}
      >
        Salvar Questão
      </button>
    </div>
  );
}

export default Admin;
