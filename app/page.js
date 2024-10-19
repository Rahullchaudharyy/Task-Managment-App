// 'use client'
import React from 'react'
import TaskManager from './TaskManager'

const page = async () => {

  

   const FetchInitialTask = ()=>{
    return[
      { id: 1, title: 'Finish Project Report', description: 'Complete the final report for the project.', priority: 'High', completed: true },
      { id: 2, title: 'Buy Groceries', description: 'Milk, Bread, Eggs, Butter, and Vegetables.', priority: 'Medium', completed: false },
      
    

    ]
   }

   const  initialState =  FetchInitialTask()


  console.log(initialState)
  return (
    <div id='Main-Div'>
     
     <TaskManager initialState={initialState}/>
      

    </div>

  )
}

export default page
