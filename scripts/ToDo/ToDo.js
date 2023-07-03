class ToDoList {
    //formularz do dodania taska
    taskForm = document.querySelector("#formTask");
    //input taska
    input = document.querySelector("#toDo-input");
    //container dodanych tasków
    taskContainer = document.querySelector("#tasks");
    //input calendar
    calendarInput = document.querySelector(".input-calendar");
   

    constructor(){

        this.taskForm.addEventListener("submit", event => this.addingTask(event));
    };

    //metoda, tworzy i dodaje nowego taska
    addingTask(event) {
        //zatrzymanie refreshowania strony przy submit nowego taska
        event.preventDefault();
     
        const task = this.input.value;
        const date = this.calendarInput.value;
      //jeśli pole taska jest puste, user zostanie poproszony o uzupełnienie pola, jeśli nie jest, zostanie dodany nowy task 
        if(!task || !date ){
            return alert("Proszę uzupełnić pola taska");

        }else {

        this.newTask();

        this.input.value = "";
        this.calendarInput.value = "";
      };
    };

    //utworzenie taska
    newTask = () => {

        const task = this.input.value;
        const date = "Do   " + this.calendarInput.value;

        //nowy task container
        const newTask = document.createElement("div");
        newTask.className = "task-element";
        this.taskContainer.appendChild(newTask);

        //input nowego taska
        const newInput = document.createElement("input");
        newInput.className = "task-element-input";
        newInput.value = task;
        newInput.setAttribute("readonly","readonly");
        newTask.appendChild(newInput);

        //input calendara nowego taska
        const newCalendarInput = document.createElement("input");
        newCalendarInput.className = "task-element-calendar-input";
        newCalendarInput.value = date;
        newCalendarInput.setAttribute("readonly","readonly");
        newTask.appendChild(newCalendarInput);

        //button container nowego taska
        const newButtonsContainer = document.createElement("div");
        newButtonsContainer.className= "task-buttons-container";
        newTask.appendChild(newButtonsContainer);

        //button do edytowania
        const editButton = document.createElement("button");
        editButton.classList.add("editTask", "lightButton");
        editButton.innerHTML = "Edytuj";
        newButtonsContainer.appendChild(editButton);

        //button do usuwania
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteTask", "deleteButton");
        deleteButton.innerHTML = "Usuń";
        newButtonsContainer.appendChild(deleteButton);


        //event listenery dla przycisków w dodanych taskach
        editButton.addEventListener("click", event => this.editTask(event,newInput,newCalendarInput,editButton));
        deleteButton.addEventListener("click", event => this.deleteTask(event,newTask));

    };

    //edytowanie dodanego taska
    editTask(event,input,calInput,button){
        event.preventDefault();

        //możliwość edycji inputa
        if(button.innerText.toLowerCase() == "edytuj" ){
            input.removeAttribute("readonly");
            calInput.removeAttribute("readonly");
            input.focus();
            button.innerHTML = "Zapisz";
            console.log(button.innerHTML)
        //zapisanie edycji
        }else {
            input.setAttribute("readonly","readonly");
            calInput.setAttribute("readonly","readonly");
            button.innerHTML = "Edytuj";
            console.log(button.innerHTML)
        }
    };

    //usuwanie dodanego taska
    deleteTask(event,newTaskContainer) {
        event.preventDefault();

        this.taskContainer.removeChild(newTaskContainer);
    };
};

let toDo = new ToDoList();