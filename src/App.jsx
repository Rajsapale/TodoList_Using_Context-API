import {useEffect, useState} from 'react'
import { TodoProvider } from './contex';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';


function App() {
  const [todos, setTodos] = useState([]);

const addTodo = (todo) =>{
 setTodos((prev) => ([...prev,{id:Date.now(),...todo}]))   // setTodos have one callback function which have access of previous valye so to add new value in previous array (or any value) this method is used 
}

const updateTodo =(id , todo) =>{
setTodos((prev) => prev.map((eachPrevTodo)=>(eachPrevTodo.id === id ? todo : eachPrevTodo))) //compair id of each object and update todo when id matches 
}

const deleteTodo = (id) =>{
setTodos((prev) =>prev.filter((eachPrevTodo) => (eachPrevTodo.id !== id)))  // filter filtera values from array when condition have true value. ** filter only acts on true values  
}

const toggleComplete = (id) =>{
  setTodos((prev) => prev.map((eachPrevTodo) => (eachPrevTodo.id === id ? {...eachPrevTodo, completed:!eachPrevTodo.completed} : eachPrevTodo))) // change value of checkmark 
}

// local storage part
// to store data in local storage we have to pass key and data 
// to get data from local storage just pass key 

useEffect(() => {
  
  const todoData = JSON.parse(localStorage.getItem("todokey")); // localstorage save data in string and give us as string 

if(todoData && todoData.length >0){
  setTodos(todoData)
}  
}, []);

useEffect(
  ()=>{
    localStorage.setItem("todokey", JSON.stringify(todos))
  },[todos]
)
  
  return (
  
    <TodoProvider value={{todos, addTodo, toggleComplete, deleteTodo, updateTodo}}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form component goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                          <div key={todo.id}
                          className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
