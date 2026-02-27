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
    <div className="card bg-base-200 p-5 mt-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <MessageSquare size={20} />
        Add Argument
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Argument Type */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Argument Type</span>
          </label>
          <select
            name="type"
            className="select select-bordered w-full"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="claim">Claim</option>
            <option value="evidence">Evidence</option>
            <option value="rebuttal">Rebuttal</option>
            <option value="counter">Counter-Argument</option>
          </select>
        </div>

        {/* Parent Selection */}
        <div>
          <label className="label">
            <span className="label-text font-medium">
              Reply To (Optional)
            </span>
          </label>
          <select
            name="parentId"
            className="select select-bordered w-full"
            value={formData.parentId}
            onChange={handleChange}
          >
            <option value="">— Root Argument —</option>
            {argumentsList.map(arg => (
              <option key={arg.id} value={arg.id}>
                {arg.speakerName} — {arg.content.slice(0, 40)}...
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Your Argument</span>
          </label>
          <textarea
            name="content"
            className="textarea textarea-bordered w-full"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            placeholder="Present your argument here..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          <MessageSquare size={18} />
          Submit Argument
        </button>
      </form>
    </div>
  );
};

export default ArgumentForm;