import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";

// TODO: do i need this components?

function MyProfile({ user }) {
  const {
    name,
    email,
    profilePicture,
    age,
    gender,
    budget,
    phone,
    description,
  } = user;

  const [newTask, setNewTask] = useState("");
  const [tasksArr, setTasksArr] = useState([]);
  const [editedTask, setEditedTask] = useState("");

  const handleAddNewTask = () => {
    const newTasksArr = [...tasksArr, newTask];
    setTasksArr(newTasksArr);
  };
  const handleEditTask = (index) => {
    console.log(index);
    let newTasksArr = [...tasksArr];
    newTasksArr[index] = editedTask;
    setTasksArr(newTasksArr);
  };
  const handleDeleteTask = (index) => {
    let newTasksArr = [...tasksArr];
    newTasksArr.splice(index, 1);
    setTasksArr(newTasksArr);
  };

  const showTasks = () => {
    return tasksArr.map((task, index) => {
      return (
        <div key={index}>
          {task}
          <input
            type="text"
            placeholder="Enter your change"
            onChange={(e) => {
              setEditedTask(e.target.value);
            }}
          ></input>
          <button onClick={() => handleEditTask(index)}>save</button>
          <button onClick={() => handleDeleteTask(index)}>delete</button>
        </div>
      );
    });
  };

  return (
    <div className="Me">
      <input
        type="text"
        placeholder="Enter your task"
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      ></input>
      <button onClick={handleAddNewTask}>Add</button>
      {newTask && showTasks ? showTasks() : <div></div>}
      <Profile user={user} />
    </div>
  );
}

export default MyProfile;
