
import React,{useState,useRef, useEffect} from 'react';
import TodoList from './TodoList';
import "./css/styles.css"
// import uuid  from 'uuidv4';
import { nanoid } from 'nanoid'; //generating a unique key id

const LOCAL_STORAGE_KEY="todoApp.todos"

function App() {


  

 const [todos,setTodos] =useState([])
 const todoNameRef = useRef()
 useEffect(()=>{
  const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos)setTodos(storedTodos)
 },[])
 useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
 },[todos])
  



function toggleTodo(id){
  const newTodos=[...todos]
  const todo =newTodos.find(todo=>todo.id===id)
  todo.complete=!todo.complete
  setTodos(newTodos)
}
 function handleAddTodo(e){
  const name = todoNameRef.current.value
  if (name === '') return
  // console.log(name)
  setTodos(prevTodos=>{
    return[...prevTodos,{id: nanoid(), name:name, complete:false}]
    

  })
  todoNameRef.current.value=null



 }
 function hnadleClearTodos(){
  const newTodos=todos.filter(todo=>!todo.complete)
  setTodos(newTodos)
 }

  return (
    <>
    <div className='container'>

    <TodoList toggleTodo={toggleTodo} todos={todos}/>
    <div className='sub-container'>
    <input ref={todoNameRef} type="text"/>
    <button className='addbtn' onClick={handleAddTodo}>Add Todo</button>
    <button className='clearbtn' onClick={hnadleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo=> !todo.complete).length} left to do </div>
    </div>
    </div>
    </>
    
  );
}

export default App;