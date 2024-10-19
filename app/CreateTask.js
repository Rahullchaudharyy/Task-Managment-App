import React, { useState,useEffect } from 'react';
// import './global.css'; // Import the global CSS file

const CreateTask = ({onSave, task,isEditing,isTaskCreating}) => {
  const [title, setTitle] = useState(task?task.title:'');
  const [description, setDescription] = useState(task?task.description:'');
  const [priority, setPriority] = useState(task?task.priority:'Medium');
  const [completed, setCompleted] = useState(task ? task.completed : false);

   useEffect(()=>{
          if(task){
            setTitle(task.title)
            setDescription(task.description);
            setPriority(task.priority);
            setCompleted(task.completed);
          }
   },[task])




   const handleSave= (e)=>{
    e.preventDefault()
    const newTask = {title,description,priority,completed}
    if (!newTask.title && !newTask.description) {
        alert('Please fill the required filds')
    } else{

        onSave(newTask)
    }
   }

  return (
    <div id='Create-task'>
        <div style={{display:'flex',gap:'50px',justifyContent:'space-between'}}>

      <h2>Create New Task</h2>
      <button style={{padding:'5px',width:'150px',borderRadius:'10px', border:'none',cursor:'pointer'}} onClick={isTaskCreating}>Cancel</button>
        </div>
      <form id='form' >
        {/* Title Field */}
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter the title e.g., Client Meeting'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Field */}
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            placeholder='Enter task description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Priority Field */}
        <div className='form-group'>
          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
        </div>

        {/* Submit Button */}
        <button onClick={handleSave} type='submit'>{isEditing?"Save ": "+  Add New Task"}</button>
      </form>
    </div>
  );
};

export default CreateTask;
