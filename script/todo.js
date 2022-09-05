class Todo{

    constructor(text, complete) {
        this.id = CreateUUID();
        this.text = text;
        this.complete = complete
    }


    getText(){
        return this.text;
    }

    setText(text){
        this.text = text;
    }

    setID(id){
        this.id = id;
    }

    getComplete(){
        return this.complete;
    }

    getID(){
        return this.id;
    }

    toggleComplete(){
        this.complete = !this.complete;
    }
}


function CreateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}