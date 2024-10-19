'use client'
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './app/taskSlice.js'

export const store = configureStore({
    reducer:{
        tasks:tasksReducer
    }
})