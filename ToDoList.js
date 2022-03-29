import './ToDoList.css';
import { useState } from 'react';

const App = () => {

  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);

  return(
    
  <div className="App">
    <h1>To Do List</h1>
    <input type="text" value={inputText} onChange = {(event)=>{
      setInputText(event.target.value);
    }}/>
    
    <button onClick ={()=> {
      setTodoList([...todoList,{todo : inputText, disabled : false}]);
      setInputText("");
    }}>Add</button>
    
    <ul>
      {todoList.map(({todo,disabled},index) =>(
        <li className = {disabled? "disabled-todo-item":""}
         key={index}
         onClick = {() =>{
            setTodoList(todoList.map((value, i) => i === index? {...value,disabled : !value.disabled } : value));
         }}> {index}{". "} {todo} </li>
      ))}
  
    </ul>
  </div>
);  
}  
export default App;

