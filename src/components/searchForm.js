import React, { useState } from "react";

const SearchForm = (props) => {
  //El titulo y la descripcion y sus setters
  const [text, setText] = useState("");

  //Funciones para cambiar el valor del titulo y la descripcion
  const handleQuery = (e) => {
    setText(e.target.value);
  };

  //Funcion para manejar el evento de pulsar boton, se guarda el id etc
  //Y se muestra el campo de texto
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      text: { text }
    });
    setText("");
  };

  return (
    <form className="listform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search task by name, priority or deadline"
        value={text}
        name="query"
        className="searchinput"
        onChange={handleQuery}
      />
      <button className="listbutton">Search</button>
    </form>
  );
};

export default SearchForm;
