'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tasksSlice =  createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        addTask:(state,action)=>{
            state.push(action.payload)
            if (typeof window !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(state)); 
            }        },
        deleteTask:(state,action)=>{
            const updatedTask = state.filter((task,index)=>index !== action.payload)
            if (typeof window !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(updatedTask)); 
            }
            return updatedTask;
        },
        updateTask: (state, action) => {
            const { index, updatedTask } = action.payload;
            state[index] = updatedTask;  
            if (typeof window !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(state)); 
            }

        },
        toggleTaskCompletion:(state,action)=>{
            const {index } = action.payload;
            state[index].completed = !state[index].completed;
        }

    }

})


export const {addTask,deleteTask,updateTask,toggleTaskCompletion} = tasksSlice.actions

export default tasksSlice.reducer;

