import {createContext,useContext} from "react"

// context creation 
export const TodoContex = createContext({
    todos:[
        {
            id :1,
            tName : "todo msg",
            completed : false
        }
    ],
    addTodo : (todo) =>{},   // method for add new item in todo
    updateTodo :(id,todo) =>{}, // method to update todo
    deleteTodo : (id) =>{},      // method for delete
    toggleComplete :(id) =>{}   // method to check status 

});


// custum hook 
export const useTodo = () => {
    return useContext(TodoContex);
}

// provide for context , done this way to avoid writing todoContext.provider in main file 
export const TodoProvider = TodoContex.Provider;