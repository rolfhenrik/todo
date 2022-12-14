class View{
    constructor() {

        //The root element in the html
        this.app = this.getElement('#root');

        //The title of our app
        this.title = this.createElement(('h1'));
        this.title.textContent = "Todos";


        //The form, with a [type="text"] input and a submit buttong
        this.form = this.createElement("form");

        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";

        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";

        //The visual representation of the todos list
        this.todoList = this.createElement("ul", "todo-list");

        //append the input and submit button to the form
        this.form.append(this.input, this.submitButton);


        //Append the title, form and todos list to our app
        this.app.append(this.title, this.form, this.todoList);
    }

    get _todoText(){
        return this.input.value;
    }

    _resetInput(){
        this.input.value = "";
    }

    // will create the ul and lis that the todos list consists of and display them.
    // Every time a todoItem is changed, added, or removed, the displayTodos method will be called again with the todos from the model, resetting the list and re-displaying them.
    // This will keep the view in sync with the model state.


    displayTodos(todos){

        //Delete all nodes
        while (this.todoList.firstChild){
            this.todoList.removeChild(this.todoList.firstChild);
        }

        if(todos.length === 0){
            const p = this.createElement("p");
            p.textContent = "Nothing to do. Add a task?";
            this.todoList.append(p);
        }
        else {

            //Adding the todos
            todos.forEach( todo => {

                //Creating a li element for the todo
                const li = this.createElement("li");
                li.id = todo.id;

                //Each todoitem will have a checkbox you can toggle
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                // The todoitem text will be in a contenteditable span
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                // If the todoitem is complete, it will have a strikethrough
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    // Otherwise just display the text
                    span.textContent = todo.text;
                }

                // The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                // Append nodes to the todo list
                this.todoList.append(li)
            })


        }

    }

    bindAddTodo(handler){
        this.form.addEventListener("submit", event => {
            event.preventDefault();

            if(this._todoText){
                handler(this._todoText);
                this._resetInput();
            }

        })
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = event.target.parentElement.id;

                handler(id);
            }
        })
    }




    //Helper functions for creating an element and getting an element

    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag);

        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
}