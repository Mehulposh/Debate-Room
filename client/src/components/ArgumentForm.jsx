import React, { useState, useMemo } from 'react';
import { MessageSquare } from 'lucide-react';

const ArgumentForm = ({ onSubmit, argumentsList = [] }) => {
  const [formData, setFormData] = useState({
    content: '',
    type: 'claim',
    parentId: ''
  });

  const rootArguments = useMemo(() => {
    return argumentsList.filter(arg => !arg.parentId);
  }, [argumentsList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    onSubmit({
      ...formData,
      parentId: formData.parentId || null
    });

    setFormData({
      content: '',
      type: 'claim',
      parentId: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
  <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-10 pb-10">
    <div className="card bg-base-200 p-4 sm:p-5">
      
      <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold mb-4">
        <MessageSquare size={18} />
        Add Argument
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Argument Type + Reply To — side by side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Argument Type</span>
            </label>
            <select
              name="type"
              className="select select-bordered select-sm sm:select-md w-full"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="claim">Claim</option>
              <option value="evidence">Evidence</option>
              <option value="rebuttal">Rebuttal</option>
              <option value="counter">Counter-Argument</option>
            </select>
          </div>

          <div>
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Reply To (Optional)</span>
            </label>
            <select
              name="parentId"
              className="select select-bordered select-sm sm:select-md w-full"
              value={formData.parentId}
              onChange={handleChange}
            >
              <option value="">— Root Argument —</option>
              {argumentsList.map(arg => (
                <option key={arg.id} value={arg.id}>
                  {arg.speakerName} — {arg.content.slice(0, 30)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="label py-1">
            <span className="label-text font-medium text-sm">Your Argument</span>
          </label>
          <textarea
            name="content"
            className="textarea textarea-bordered w-full text-sm sm:text-base"
            value={formData.content}
            onChange={handleChange}
            rows="3"
            placeholder="Present your argument here..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm sm:btn-md w-full">
          <MessageSquare size={16} />
          Submit Argument
        </button>

      </form>
    </div>
  </div>
);
};

export default ArgumentForm;