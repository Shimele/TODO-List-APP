'use strict';
const todoArray = [];
//store array items in local storage
function localStore(){
    for(let i =0; i < todoArray.length; i++){
        const taskStr = JSON.stringify(todoArray[i])
        localStorage.setItem(i,taskStr)
    }
}

//constructor function, constructs task object
function Task(title, description, priority){
    this.title = title;
    this.description = description;
    this.priority = priority;
}

//display task
function display(option = 'Urgent'){
    const displaySection = document.querySelector('.orderedList');
    const priorityLevel = document.querySelector('.priorityLevel');
    let display = ''

    priorityLevel.innerHTML = option
    /*for(let i = 0; i < todoArray.length; i++){
        if(todoArray[i].priority == option){
            display += `<li>${todoArray[i].title}</li>`
            display += `<p>${todoArray[i].description}</p>`
        }
    }
    if(display.length == 0){
        let errorMessage = "Ooops no task for now!";
        displaySection.innerHTML = errorMessage;
    }else{
        displaySection.innerHTML = display;
    }*/
    //loop task stored in localStorage and display
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let objectValue = JSON.parse(localStorage.getItem(key))
    
        if(objectValue.priority == option){
            display += `<li>${objectValue.title}</li>`
            display += `<p>${objectValue.description}</p>`
        }    
    }
    
    if(display.length == 0){
        let errorMessage = "Ooops no task for now!";
        displaySection.innerHTML = errorMessage;
    }else{
        displaySection.innerHTML = display;
    }

}

//collect task and store in array of objects
const creatTask = document.querySelector('#new-task');
creatTask.addEventListener("click", e => {
    const title = document.querySelector('[name ="title"]').value;
    const description = document.querySelector('[name ="description"]').value;
    const priority = document.querySelector('[name ="priority"]').value;
    const task = new Task(title,description,priority);
    todoArray.push(task)
    localStore()
    e.preventDefault();
})


//event listener on priority(option) click
const priorityButton = document.querySelectorAll('.priorities')
priorityButton.forEach(element => {
    element.addEventListener('click', e => {
        if(element.innerHTML)
        display(element.innerHTML)
        
        e.preventDefault();
    })
});

display()
