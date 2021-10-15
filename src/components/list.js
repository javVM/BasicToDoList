import React, { useState } from "react";
import ToDoForm from "./toDoListForm";
import { FaEdit } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import TaskForm from "./taskForm";

//Obtenemos las funciones y variables estado necesarias de toDoList
const List = ({
  lists,
  isSearch,
  removeList,
  editList,
  removeTask,
  editTask,
  isSearching,
  query,
  getListId
}) => {
  const [edit, setEdit] = useState({ id: null, val1: "", val2: "" });

  const [edit_task, setEditTask] = useState({
    id: null,
    val1: "",
    val2: "",
    val3: "",
    val4: ""
  });

  const Update = (newList) => {
    editList(edit.id, newList);
    setEdit({ id: null, val1: "", val2: "" });
  };

  const UpdateTask = (newTask) => {
    editTask(edit_task.id, edit_task.val4, newTask);
    setEditTask({ id: null, val1: "", val2: "", val3: "", val4: "" });
  };

  if (edit.id) {
    return <ToDoForm edit={edit} onSubmit={Update} />;
  }

  if (edit_task.id) {
    return <TaskForm edit_task={edit_task} onSubmit={UpdateTask} />;
  }
  /*
     //Si se ha realizado una busqueda, apareceran los resultados
     //En caso contrario, aparecen todos
     //*********************************************
    //isSearch=true Se hace mapping de las listas y posteriormente, mapping
    //de las tareas de cada lista
    //isSearch=false Se obtienen todas las tareas y se filtra
  */
  if (!isSearch) {
    return lists.map((list, index) => (
      <div className="rowContainer" key={index}>
        <div className="list-row">
          <div key={list.id}>
            <strong>List: </strong>
            {list.title}
            <br></br>
            <strong>Description (optional): </strong> {list.desc}
          </div>
          <div className="options">
            <FaEdit
              onClick={() =>
                setEdit({ id: list.id, val1: list.title, val2: list.desc })
              }
              className="edit-icon"
            />
            <FaEraser
              onClick={() => removeList(list.id)}
              className="erase-icon"
            />
          </div>
        </div>
        {list.tasks.map((task, index) => (
          <div className="task-row" key={index}>
            <div key={task.id}>
              {task.task}&nbsp;&nbsp;&nbsp;
              <strong> Deadline: </strong>
              {task.deadline}&nbsp;&nbsp;&nbsp;
              <strong> Priority: </strong>
              {task.priority}
            </div>
            <div className="options">
              <FaEdit
                onClick={() =>
                  setEditTask({
                    id: task.id,
                    val1: task.task,
                    val2: task.deadline,
                    val3: task.priority,
                    val4: task.list
                  })
                }
                className="edit-icon"
              />
              <FaEraser
                onClick={() => removeTask(list.id, task.id)}
                className="erase-icon"
              />
            </div>
          </div>
        ))}
      </div>
    ));
  } else {
    //Creamos una matriz de tareas
    const aux = [...lists].map((item) => (item = item.tasks));
    //Ahora tenemos todas las tareas en un solo array
    const aux2 = [].concat.apply([], aux);
    //Se filtra para ver si coincide algo del texto, fecha o prioridad
    const res = aux2.filter(
      (item) =>
        item.priority === query.text.toLowerCase() ||
        item.task.includes(query.text) ||
        item.deadline === query.text
    );

    return (
      <div>
        <h3>These are your search results:</h3>
        <div>
          {res.map((task, index) => (
            <div className="task-row" key={index}>
              <div key={task.id}>
                {task.task}&nbsp;&nbsp;&nbsp;
                <strong> Deadline: </strong>
                {task.deadline}&nbsp;&nbsp;&nbsp;
                <strong> Priority: </strong>
                {task.priority}
              </div>
              <div className="options">
                <FaEdit
                  onClick={() =>
                    setEditTask({
                      id: task.id,
                      val1: task.task,
                      val2: task.deadline,
                      val3: task.priority,
                      val4: task.list
                    })
                  }
                  className="edit-icon"
                />
                <FaEraser
                  onClick={() => removeTask(getListId(task.list), task.id)}
                  className="erase-icon"
                />
              </div>
            </div>
          ))}
        </div>
        <button className="gobackbutton" onClick={() => isSearching(false)}>
          Go Back
        </button>
      </div>
    );
  }
};

export default List;
