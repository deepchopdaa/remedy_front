import axios from 'axios';
import { useState } from 'react';

const AiRemedy = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const getSuggestion = async () => {
    const res = await axios.post('http://localhost:5000/api/ai/suggest', { symptoms: input });
    setResult(res.data.suggestion);
  };

  return (
    <div>
      <textarea placeholder="Describe symptoms..." onChange={(e) => setInput(e.target.value)} />
      <button onClick={getSuggestion}>Get Remedy</button>
      <p>{result}</p>
    </div>
  );
};

export default AiRemedy;