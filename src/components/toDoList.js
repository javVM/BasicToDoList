import React, { useState } from "react";
import ToDoForm from "./toDoListForm";
import List from "./list";
import TaskForm from "./taskForm";
import SearchForm from "./searchForm";

const ToDoList = () => {
  //Array de listas y su setter (con este se actualizara el valor)
  const [lists, setLists] = useState([]);

  const [isSearch, setSearch] = useState(false);
  const [query, setQuery] = useState("");

  //Sirve para cambiar de modo (busqueda/normal)
  const setIsSearching = () => {
    if (isSearch) setSearch(false);
    else setSearch(true);
  };

  const getSearch = (query) => {
    if (!query.text || /^\s*$/.test(query.text)) {
      return;
    }
    setQuery(query.text);
    setSearch(true);
  };

  const getListId = (name) => {
    const aux = [...lists].filter((item) => item.title === name);
    return aux[0].id;
  };

  //Funcion para añadir una lista de cosas que hacer
  const AddList = (list) => {
    if (!list.title || /^\s*$/.test(list.title)) {
      return;
    }
    const aux = [...lists].filter((item) => item.title === list.title);
    if (aux.length > 0) {
      alert("There is already a list with that name!");
      return;
    }
    //Se usa spread para copiar el contenido de lists
    const updatedList = [list, ...lists];
    //Se actualiza el valor de lists por el de la lista actualizada
    setLists(updatedList);
  };

  //Funcion para editar una lista
  const EditList = (list_id, updatedList) => {
    if (!updatedList.title || /^\s*$/.test(updatedList.title)) {
      return;
    }
    //Se busca al elemento que contiene el id y se cambia por el nuevo
    setLists((list) =>
      list.map((item) => (item.id === list_id ? updatedList : item))
    );
  };

  //Funcion para eliminar una lista
  const RemoveList = (list_id) => {
    //Se pregunta primero si se quiere eliminar
    const result = window.confirm("Are you sure you want to delete this list?");
    if (result === true) {
      const updatedList = [...lists].filter((item) => item.id !== list_id);
      setLists(updatedList);
    }
  };

  //Funcion para añadir una lista de cosas que hacer
  const AddTask = (task) => {
    if (
      !task.task ||
      /^\s*$/.test(task.task) ||
      !task.deadline ||
      !task.list ||
      /^\s*$/.test(task.list)
    ) {
      return;
    }
    //Se obtiene la lista a la que la queremos añadir si existe
    const aux = [...lists].filter((item) => item.title === task.list);
    //Se usa spread para copiar el contenido de lists
    if (aux.length === 0) {
      alert("No existe esa lista");
      return;
    }

    const taskExists = aux[0].tasks.filter((item) => item.task === task.task);

    if (taskExists.length > 0) {
      alert("Ya existe una lista con ese nombre");
      return;
    }

    //Se inserta la tarea en el array y se actualiza la lista
    aux[0].tasks.push(task);
    setLists((list) =>
      list.map((item) => (item.id === aux[0].id ? aux[0] : item))
    );
  };

  //Funcion para eliminar una lista
  const RemoveTask = (list_id, task_id) => {
    //Se pregunta primero si se quiere eliminar
    const result = window.confirm("Are you sure you want to delete this task?");
    if (result === true) {
      //Se obtiene la lista a la que la queremos añadir si existe
      let aux = [...lists].filter((item) => item.id === list_id);
      const taskErased = aux[0].tasks.filter((item) => item.id !== task_id);
      aux[0].tasks = taskErased;

      setLists((list) =>
        list.map((item) => (item.id === aux[0].id ? aux[0] : item))
      );
    }
  };

  //Funcion para editar una tarea
  const EditTask = (task_id, task_list, updatedTask) => {
    if (
      !updatedTask.task ||
      /^\s*$/.test(updatedTask.task) ||
      !updatedTask.deadline ||
      !updatedTask.list ||
      /^\s*$/.test(updatedTask.list)
    ) {
      return;
    }

    if (task_list === updatedTask.list) {
      let aux = lists.filter((item) => item.title === task_list);
      const aux2 = aux[0].tasks.map((item) =>
        item.id === task_id ? updatedTask : item
      );
      aux[0].tasks = aux2;

      setLists((list) =>
        list.map((item) => (item.id === aux[0].id ? aux[0] : item))
      );
    } else {
      //Se elimina de la antigua lista
      let aux = lists.filter((item) => item.title === task_list);
      const aux2 = aux[0].tasks.filter((item) => item.id !== task_id);
      aux[0].tasks = aux2;
      setLists((list) =>
        list.map((item) => (item.id === aux[0].id ? aux[0] : item))
      );
      //Se añade a la nueva lista
      AddTask(updatedTask);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={getSearch} />
      <ToDoForm onSubmit={AddList} />
      <TaskForm onSubmit={AddTask} />
      <List
        lists={lists}
        isSearch={isSearch}
        removeList={RemoveList}
        editList={EditList}
        removeTask={RemoveTask}
        editTask={EditTask}
        isSearching={setIsSearching}
        query={query}
        getListId={getListId}
      />
    </div>
  );
};

export default ToDoList;
