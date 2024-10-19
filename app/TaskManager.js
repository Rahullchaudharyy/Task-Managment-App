'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CreateTask from './CreateTask';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion, updateTask } from './taskSlice';



const TaskManager = ({ initialState }) => {
    const [InitTasks, setInitTasks] = useState(initialState)
    
    const [IsTaskCreating, setIsTaskCreating] = useState(false)
    const [editingTask, setEditingTask] = useState(null);
    const [IsEditing, setIsEditing] = useState(false)
    const [Input, setInput] = useState(null)
    const [SearchedData, setSearchedData] = useState([])
    const [FilteredData, setFilteredData] = useState([]) 
    const [activeFilter, setActiveFilter] = useState('all')
    const [MenuOpen, setMenuOpen] = useState(false)

    let tasks = useSelector((state) => state.tasks)
    const TotalTask = tasks.length
    const CompletedTask = tasks.filter(task=>task.completed===true)
    const PendingTask = tasks.filter(task=>task.completed===false)
    
    // console.log('Toatal task is ', TotalTask)
    // console.log('Completed task is ', CompletedTask.length)

    const dispatch = useDispatch();
    //  dispatch(addTask(initialState))

useEffect(() => {
    
    const storedTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :[]
    ;
    console.log("Stored task ",storedTasks)
    if (tasks.length === 0 && storedTasks.length > 0) {
        storedTasks.forEach(task => dispatch(addTask(task)));
    }

    // console.log("Initial task",InitTasks)
});

useEffect(() => {
    
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);



    const HandleCreateBtn = () => {
        setIsTaskCreating(!IsTaskCreating)
    }

    const handleEditTask = (index) => {
        setEditingTask({ ...tasks[index], index })
        setIsEditing(true)
        console.log('In editing :', editingTask)
        console.log('IsEditing  :', IsEditing)
        setIsTaskCreating(true);

    }

    const handleDeleteTask = (index) => {
        dispatch(deleteTask(index))
    }

    const handleSaveTask = (task) => {
        if (editingTask) {
            dispatch(updateTask({ index: editingTask.index, updatedTask: task }))
            setIsEditing(false)
        } else {
            dispatch(addTask(task))
            setIsEditing(false)
        }

        setIsTaskCreating(false)
        setEditingTask(null);

    }
    const MarkCompleted = (index) => {
        dispatch(toggleTaskCompletion({ index }))
    }

    const handleSearch = ()=>{
        if (!Input) {
            setSearchedData([]);  
            return;
        }
        const SearchedResult = tasks
        .map((task, index) => ({ ...task, globalIndex: index }))  
        .filter(task =>
            task.title.toLowerCase().includes(Input?.toLowerCase() || '') ||
            task.description.toLowerCase().includes(Input?.toLowerCase() || '')
        );

        if (!SearchedResult.length) {
            alert("Not found the value")
        }
    setSearchedData(SearchedResult);



        console.log("THis is search result",SearchedResult)
    }
    const handleFilter = (filterType) => {
        setActiveFilter(filterType);
        if (filterType === 'completed') {
            setMenuOpen(!MenuOpen)
            setFilteredData(tasks.filter(task => task.completed));
        } else if (filterType === 'important') {
            setMenuOpen(!MenuOpen)
            setFilteredData(tasks.filter(task => task.priority === 'High'));
        } else if(filterType==='SORT') {
            setMenuOpen(!MenuOpen)
            const sortedTasks = [...tasks].sort((a, b) => {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority]
            });
            setFilteredData(sortedTasks)
            console.log(sortedTasks)
        }
        else {
            setMenuOpen(!MenuOpen)
            setFilteredData(tasks);
        } 
    }


    return (
        <>
       
        { MenuOpen?<div id='Left-Panel-Mobile'>
          <h1 onClick={()=>handleFilter('all')}>All Tasks</h1>
          <h1 onClick={()=>handleFilter('SORT')}>Short</h1>
          <h1 onClick={()=>handleFilter('completed')}>Completed</h1>
          <h1 onClick={()=>handleFilter('important')}>important</h1>
      </div>: <div id='Left-Panel'>
          <h1 onClick={()=>handleFilter('all')}>All Tasks</h1>
          <h1 onClick={()=>handleFilter('SORT')}>Short</h1>
          <h1 onClick={()=>handleFilter('completed')}>Completed</h1>
          <h1 onClick={()=>handleFilter('important')}>important</h1>
      </div>}
        <div id='Main-Container'>
            <div id='Top-Search-Bar'>
                <input type='text' placeholder='Type Title / Description for Search' onChange={(e)=>setInput(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <button  onClick={()=>setMenuOpen(!MenuOpen)} id='Menu-BTN'>Menu</button>
            </div> 

        <div id='Right-Panel'>
             
            {SearchedData.length > 0 ? 
            SearchedData.map((task) => (
                <div key={task.globalIndex} id='Task-Container'>
                    <div id='Title-Part'>

                        <h1 style={{
  backgroundColor: task.title.toLowerCase().includes(Input?.toLowerCase()) 
    ? 'yellow' 
    : '',
    color: task.title.toLowerCase().includes(Input?.toLowerCase()) 
    ? 'black' 
    : 'white'
}}>{task.title}</h1>
                        <h1 style={{
                            backgroundColor: task.priority == 'High' ? 'rgba(255, 0, 0, 0.402)' :
                                task.priority == 'Medium' ? 'rgba(255, 255, 0, 0.475)' :
                                    'rgba(0, 255, 0, 0.563)',
                                    padding:'5px',
                                    borderRadius:'5px', 
                            color: 'white'
                        }}>
                            {task.priority}
                        </h1>

                    </div>
                    <p style={{
  backgroundColor: task.description.toLowerCase().includes(Input?.toLowerCase()) 
    ? 'yellow' 
    : '',
    color: task.description.toLowerCase().includes(Input?.toLowerCase()) 
    ? 'black' 
    : 'white'
}} >{task.description}
                    </p>

                    <div id='Tools'>
                        <button
                            onClick={() => MarkCompleted(task.globalIndex)}
                            id='Status-Button' style={{
                                backgroundColor: task.completed ? '#28a745' : '#ffcc00',
                                color: 'white'
                            }}>{task.completed ? "Completed" : "Pending"}</button>
                        <div id='Tools-Child'>

                            <button id='Edit-btn' onClick={() => handleEditTask(task.globalIndex)}><MdOutlineEditNote /></button>
                            <button id='Delete-btn' onClick={() => handleDeleteTask(task.globalIndex)}><MdDelete /></button>

                        </div>

                    </div>
                </div>
            )):FilteredData.length>0?FilteredData.map((task, index) => (
                <div key={index} id='Task-Container'>
                    <div id='Title-Part'>

                        <h1>{task.title}</h1>
                        <h1 style={{
                            backgroundColor: task.priority == 'High' ? 'rgba(255, 0, 0, 0.402)' :
                                task.priority == 'Medium' ? 'rgba(255, 255, 0, 0.475)' :
                                    'rgba(0, 255, 0, 0.563)',
                                    padding:'5px',
                                    borderRadius:'5px', 
                            color: 'white'
                        }}>
                            {task.priority}
                        </h1>

                    </div>
                    <p>{task.description}
                    </p>

                    <div id='Tools'>
                        <button
                            onClick={() => MarkCompleted(index)}
                            id='Status-Button' style={{
                                backgroundColor: task.completed ? '#28a745' : '#ffcc00',
                                color: 'white'
                            }}>{task.completed ? "Completed" : "Pending"}</button>
                        <div id='Tools-Child'>

                            <button id='Edit-btn' onClick={() => handleEditTask(index)}><MdOutlineEditNote /></button>
                            <button id='Delete-btn' onClick={() => handleDeleteTask(index)}><MdDelete /></button>

                        </div>

                    </div>
                </div>
            )):
            tasks.map((task, index) => (
                <div key={index} id='Task-Container'>
                    <div id='Title-Part'>

                        <h1>{task.title}</h1>
                        <h1 style={{
                            backgroundColor: task.priority == 'High' ? 'rgba(255, 0, 0, 0.402)' :
                                task.priority == 'Medium' ? 'rgba(255, 255, 0, 0.475)' :
                                    'rgba(0, 255, 0, 0.563)',
                                    padding:'5px',
                                    borderRadius:'5px', 
                            color: 'white'
                        }}>
                            {task.priority}
                        </h1>

                    </div>
                    <p>{task.description}
                    </p>

                    <div id='Tools'>
                        <button
                            onClick={() => MarkCompleted(index)}
                            id='Status-Button' style={{
                                backgroundColor: task.completed ? '#28a745' : '#ffcc00',
                                color: 'white'
                            }}>{task.completed ? "Completed" : "Pending"}</button>
                        <div id='Tools-Child'>

                            <button id='Edit-btn' onClick={() => handleEditTask(index)}><MdOutlineEditNote /></button>
                            <button id='Delete-btn' onClick={() => handleDeleteTask(index)}><MdDelete /></button>

                        </div>

                    </div>
                </div>
            ))}
            <div onClick={HandleCreateBtn} id='Add-Task-Container'>
                <h1 >+  Add New Task</h1>
            </div>
            <div id='Task-Count-Container'>
    <div className="task-summary">
        <span>{`Total Tasks: ${TotalTask}`}</span>
        <span>{`Completed Tasks: ${CompletedTask.length}`}</span>
        <span>{`Pending Tasks: ${PendingTask.length}`}</span>
    </div>
</div>


            {IsTaskCreating && <CreateTask onSave={handleSaveTask} task={editingTask} isEditing={IsEditing}  isTaskCreating={HandleCreateBtn}/>}

        </div>
        </div>
        </>
    )
}

export default TaskManager