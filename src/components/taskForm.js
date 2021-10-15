import React, { useState } from "react";

const TaskForm = (props) => {
  //El nombre, la fecha de entrega, prioridad y lista con
  //sus respectivos setters
  const [task, setTask] = useState(props.edit_task ? props.edit_task.val1 : "");
  const [deadline, setDeadline] = useState(
    props.edit_task ? props.edit_task.val2 : ""
  );
  const [priority, setPriority] = useState(
    props.edit_task ? props.edit_task.val3 : ""
  );
  const [list, setTaskList] = useState(
    props.edit_task ? props.edit_task.val4 : ""
  );

  //Funciones para cambiar el valor del nombre de la tarea, de la fecha limite etc
  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTaskList = (e) => {
    setTaskList(e.target.value);
  };

  //Funcion para manejar el evento de pulsar boton, se guarda el id etc
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000000),
      task: task,
      deadline: deadline,
      priority: priority,
      list: list
    });

    setTask("");
    setDeadline("");
    setPriority("");
    setTaskList("");
  };

  return (
    <form className="listform" onSubmit={handleSubmit}>
      {props.edit_task ? (
        <>
          <input
            type="text"
            placeholder="Update Task"
            value={task}
            name="task"
            className="listinput"
            onChange={handleTask}
          />
          <input
            type="date"
            placeholder="Update deadline"
            value={deadline}
            name="deadline"
            className="taskdate"
            onChange={handleDeadline}
          />
          <select
            placeholder="Update priority"
            value={priority}
            name="priority"
            className="taskselect"
            onChange={handlePriority}
          >
            <option value="default" disabled>
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            placeholder="Update list"
            value={list}
            name="list"
            className="taskinput"
            onChange={handleTaskList}
          />
          <button className="listbutton">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Insert Task"
            value={task}
            name="title"
            className="listinput"
            onChange={handleTask}
          />
          <input
            type="date"
            placeholder="Insert deadline"
            value={deadline}
            name="deadline"
            className="taskdate"
            onChange={handleDeadline}
          />
          <select
            placeholder="Insert priority"
            value={priority}
            name="priority"
            className="taskselect"
            onChange={handlePriority}
          >
            <option value="default" disabled>
              Priority
            </option>
            <option value="low"> Low </option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            placeholder="Enter list"
            value={list}
            name="title"
            className="taskinput"
            onChange={handleTaskList}
          />
          <button className="listbutton">Add Task</button>
        </>
      )}
    </form>
  );
};

export default TaskForm;
