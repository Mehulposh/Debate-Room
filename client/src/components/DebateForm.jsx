import React from 'react'

const DebateForm = ({
    formdata,
    handleChange, 
    handleCreateDebate,
    isOpen,
    onClose
}) => {

    if(!isOpen) return null
    return (
        <div className='modal modal-open h-screen'>
            <div className='modal-box border '>
                <h2 className='font-bold text-xl text-primary mb-2 underline'>Create New Debate</h2>
                <form 
                    className='flex flex-col gap-3'
                    onSubmit={handleCreateDebate}    
                >
                    <label className='space-y-2'>
                        <p>
                            Title :
                        </p>
                        <input 
                            type='text'
                            name='title'
                            className='input'
                            required
                            value={formdata.title}
                            onChange={handleChange}
                            placeholder='Enter the debate title'
                        />
                    </label>
                    <label className='space-y-2'>
                        <p>
                            Topic :
                        </p>
                        <textarea 
                            rows='3'
                            type='text'
                            name='topic'
                            className='textarea'
                            required
                            value={formdata.topic}
                            onChange={handleChange}
                            placeholder='What is the debate about ?'
                        />
                    </label>
                    <label className='space-y-2'>
                        <p>
                            Time Limit Per Speaker (seconds) :
                        </p>
                        <input
                            type="number"
                            name="timeLimit"
                            className="input"
                            value={formdata.timeLimit}
                            onChange={handleChange}
                            min="60"
                            max="3600"
                        />
                    </label>
                    <div className='flex justify-between items-center'>
                        <button 
                            type='submit'
                            className='btn btn-primary'>
                            Create Debate
                        </button>
                        <button 
                            type='button'
                            onClick={onClose}
                            className='btn '>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* click outside to close */}
            <div
                className="modal-backdrop"
                onClick={onClose}
            ></div>
        </div>
  )
}

export default DebateForm