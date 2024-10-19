# Task Management App

A task management application built with **Next.js** and **Redux** for managing tasks effectively. This app allows users to create, edit, delete, and manage tasks with various features like filtering, sorting, and searching.

## Prerequisites

- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager, comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/Rahullchaudharyy/Task-Managment-App.git


2.Navigate to the Project Directory

cd task-management-app

3.Install Dependencies

  Run the following command to install the necessary packages:

npm install


4.Set Up Local Storage (Optional)

The application stores tasks in the browser's local storage. If you want to reset the stored tasks, you can clear your local storage by opening the browser's developer tools, navigating to the "Application" tab, and deleting the tasks key in Local Storage.


Finally 

Running the Project

To run the application in development mode, use the following command:

npm run dev


Open your web browser and navigate to:

[text](http://localhost:3000)


Approch to sorting the priority of the task:- 

In this JavaScript code, I used the sort method on the tasks array.

First, I created a shallow copy of the array because I wanted to make changes to it without affecting the original values. When the user clicks any button, I want the copied array to display in a sorted manner.

The reason for making a shallow copy is that the original array should not change. After creating the copy, I applied the sort method to it. To define the sorting order, I assigned numeric values to each priority level: High : 1, Medium : 2, and Low : 3.

And the sort method is applied to the shallow copy, it returns the array in the specified sorted order without changing the original array 
