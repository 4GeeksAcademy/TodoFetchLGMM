import React, { useState, useEffect } from "react";


function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const url = "https://playground.4geeks.com/apis/fake/todos/user/lgmm";


  function handleInput(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      let newTask = {label: inputValue, done: false}
      let newList = [...list, newTask]
      console.log(newList);
      putTodo(newList);
      setList(newList);
      setInputValue("");
    } else {
      alert("El campo no puede estar vacío");
    }
  }


  function handleRemoveItem(tarea) {
    setList(list.filter((item, i) => tarea !== item));
  }


  // 1. define una funcion asincrona que ejecura el request, -- GET
  const getTodo = async () => {
    // 2. defino la variable con el endPoint
    // 3. defino el request option
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // 4. ejecuto el fetch en modo await y el resultado lo asigno a la variable response
    const response = await fetch(url, options);
    // 5. verifico que la respuesta sea buena o de un error
    if (response.ok) {
      // 5.1.1 si la respuesta es ok obtengo el json del response (body)
      const data = await response.json();
      // 5.1.2 realizo todo lo necesario con los datos obtenidos
      console.log("ok", data);
      setList(data);
    } else {
      // 5.2 hago todo lo necesario en caso de un error en la consulta
      console.log("error", response.status, response.statusText);
    }
  };


  const putTodo = async (updateList) => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateList),
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("error", response.status, response.statusText);
    }
};


const deleteUser = async () => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.json();
    setIsActive(false);
    setList([]);
    setTask("");
  } else {
    console.log("error: ", response.status, response.statusText);
  }
};


  useEffect(() => {
    getTodo();
    return true;
  }, []); 


  return (
    <div>
      <h1>My ToDo's</h1>
      <ul>
        <li>
          <form onSubmit={handleInput}>
            <input
              type="text"
              value={inputValue}
              placeholder="¿Qué necesitas hacer?"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </li>
        {list.map((item, index) => (
          <li className="d-flex justify-content-between box" key={index}>
            {item.label}
          </li>
        ))}
        <li className="pending">
          {list.length == 0
            ? "No hay tareas, añadir tareas"
            : `Tienes ${list.length} tareas pendientes.`}
        </li>
      </ul>
      <button type="button" className="btn btn-outline-primary btn-lg mb-3 me-3"
        onClick={deleteUser}>Borrar Cuenta
      </button>

    </div>
  );
}

export default TodoList;
