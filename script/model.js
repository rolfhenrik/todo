class Model{
    constructor() {
        this.todos = [
            new Todo("Run a marathon", false),
            new Todo("Wash my car", false)
        ];


    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    addTodo(todoText){

        const todo = new Todo(todoText, false);

        this.todos.push(todo);

        this.onTodoListChanged(this.todos);
    }

    //Map through all todos, and replace the text of the todo with the specified id
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo,
        )

        this.onTodoListChanged(this.todos);

    }

    // Filter a todo out of the array by id
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);

        this.onTodoListChanged(this.todos);

    }

    // Flip the complete boolean on the specified todo
    toggleTodo(id) {
        this.todos.find((todo) => {
            if(todo.getID() === id){
                todo.toggleComplete();
            }
        })


        this.onTodoListChanged(this.todos);
    }


}