import TodoHomePage from './Component/Pages/TodoHomePage.jsx'
import './App.css'
import mountain from './Asset/photo-1519681393784-d120267933ba.webp'
import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';


let initialdata = [
  {
    status: false,
    msg: "Buy Vegitable for home"
  },
  {
    ststus: true,
    msg: "Done school Work"
  }

]

function App() {

  const addinput = useRef(null);

  const [todos, setTodos] = useState(initialdata);
  const [allTodos, setAllTodos] = useState(initialdata)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (addinput.current.value === "") return;
      setTodos([...todos, { status: false, msg: addinput.current.value }])
      setAllTodos([...todos, { status: false, msg: addinput.current.value }])
      addinput.current.value = "";
    }
  };

  const updateTodoStatus = (index) => {
    let newTodos = [...todos];
    newTodos[index].status = !newTodos[index].status;
    setTodos(newTodos)
    setAllTodos(newTodos)
  }

  // Bootom show Oeration Done and onging

  const showAllTask = () => {
    setTodos(allTodos)
  }

  const showNonCompletedTask = () => {
    let newTodos = [...allTodos];
    newTodos = newTodos.filter((todo) => !todo.status);
    setTodos(newTodos);
  }

  const showCompletedTask = () => {
    let newTodos = [...allTodos];
    newTodos = newTodos.filter((todo) => todo.ststus);
    setTodos(newTodos)
  }

  const ClearCompletedTask = () => {
    let newTodos = [...allTodos];
    newTodos = newTodos.filter((todo) => !todo.status);
    setTodos(newTodos);
    setAllTodos(newTodos);
  }

  return (
    <div className="App">

      <header>
        <img src={mountain}></img>
        <div className='addtodo'>
          <h1>TODO</h1>
          <div className='input'>
            <input type='radio' />

            <input type='text'
              ref={addinput}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </header>
      <div className='todolist'>
        <table className='todos' >
          {
            todos.map((todo, index) => {
              return (
                <tr>
                  <td>
                    <input type='radio' checked={todo.status} onClick={() => updateTodoStatus(index)} />
                  </td>
                  <td className={todo.status ? 'strikethrough-text' : ""}>
                    {todo.msg}
                  </td>
                </tr>
              )
            }
            )
          }

        </table>

        <section className='statecontrol'>
          <div className='count'>{
            allTodos.filter((todo) => !todo.status).length
          } Item Left
          </div>
          <div className='options'>
            <Button variant="contained" className='option' onClick={showAllTask}>All</Button>
            <Button variant="outlined" className='option' onClick={showNonCompletedTask}>Active</Button>
            <Button variant="contained" className='option' onClick={showCompletedTask}>Completed</Button>
            <Button variant="outlined" color="error" className='clear' onClick={ClearCompletedTask}> Clear Completed</Button>
          </div>

        </section>

      </div>

    </div>
  );
}

export default App;
