import React, { useState } from "react";

const ToDoForm = (props) => {
  //El titulo y la descripcion y sus setters
  const [title, setTitle] = useState(props.edit ? props.edit.val1 : "");
  const [description, setDescription] = useState(
    props.edit ? props.edit.val2 : ""
  );

  //Funciones para cambiar el valor del titulo y la descripcion
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

  //Funcion para manejar el evento de pulsar boton, se guarda el id etc
  //Y se muestra el campo de texto y el text area de nuevo a cero
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 100000),
      title: title,
      desc: description,
      tasks: []
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form className="listform" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Change title"
            value={title}
            name="title"
            className="listinput"
            onChange={handleTitle}
          />
          <input
            type="textarea"
            placeholder="Change description"
            value={description}
            name="description"
            className="listdescription"
            onChange={handleDesc}
          />
          <button className="listbutton">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter list title"
            value={title}
            name="title"
            className="listinput"
            onChange={handleTitle}
          />
          <input
            type="textarea"
            placeholder="Enter description"
            value={description}
            name="description"
            className="listdescription"
            onChange={handleDesc}
          />
          <button className="listbutton">Add List</button>
        </>
      )}
    </form>
  );
};

export default ToDoForm;
