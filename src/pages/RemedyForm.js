import axios from 'axios';
import { useState } from 'react';

const RemedyForm = () => {
  const [form, setForm] = useState({ title: '', description: '', ingredients: '', steps: '', category: '', image: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) {
      if (key === 'ingredients' || key === 'steps')
        data.append(key, JSON.stringify(form[key].split(',')));
      else
        data.append(key, form[key]);
    }
    await axios.post('http://localhost:5000/api/remedies', data);
    alert('Remedy submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="ingredients" placeholder="Comma separated ingredients" onChange={handleChange} />
      <input name="steps" placeholder="Comma separated steps" onChange={handleChange} />
      <input name="image" type="file" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RemedyForm;