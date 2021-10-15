import React from "react";
import "./styles.css";
import ToDoList from "./components/toDoList.js";

function App() {
  return (
    <div className="App">
      <h1>ToDoList</h1>
      <h2>Save and edit your lists here</h2>
      <div className="Container">
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
