import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const ArgumentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    content: '',
    type: 'claim',
    parentId: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    onSubmit(formData);
    setFormData({ content: '', type: 'claim', parentId: null });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center h-full">
      <h3 className='flex items-center gap-2 text-lg font-semibold underline text-error mb-2'>
        <MessageSquare size={24} />
        Add Argument
      </h3>

      <form onSubmit={handleSubmit} className='flex justify-between items-start  w-full mb-5'>
        
        <label className=' w-1/4 space-y-2 '>
          <p>Argument Type : </p>
          <select
            name="type"
            className="select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="claim">Claim</option>
            <option value="evidence">Evidence</option>
            <option value="rebuttal">Rebuttal</option>
            <option value="counter">Counter-Argument</option>
          </select>
        </label>

        
        <label className=' w-1/2 space-y-2'>
          <p>Argument :</p>
          <textarea
            name="content"
            className="textarea w-full"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            placeholder="Present your argument here..."
            required
          />
        </label>

        <button 
          type="submit" 
          className="btn btn-primary"
          
        >
          <MessageSquare size={18} />
          Submit Argument
        </button>
      </form>
    </div>
  );
};

export default ArgumentForm;