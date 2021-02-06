// get vars
let todos = document.querySelector(".todos")
    input =  document.querySelector(".the-input input"),
    listContainer = document.querySelector(".items-container"),
    todo = document.querySelectorAll(".todo-item"),
    completeIt = document.querySelectorAll(".bullet"),
    removeTodo = document.querySelectorAll(".cross"),
    itemsLeft = document.querySelector(".items-left span"),
    incomplete = document.querySelectorAll(".incomplete"),
    SelectItems = document.querySelectorAll(".selection span");



//set the items left depending on the number of tasks that we have
itemsLeft.innerHTML = document.querySelectorAll(".incomplete").length;

// add todo by clicking enter (keycode === 13) is the enter key
input.addEventListener('keypress', function (e){

    if(e.keyCode === 13){
        if(input.value == ""){ 

            input.placeholder = "type something here";
        }else{
            listContainer.innerHTML += `<div class="todo-item incomplete">
                                            <div class="bullet"> <img src="images/icon-check.svg" alt=""></div>
                                            <span>${input.value}</span>
                                            <img class="cross" src="images/icon-cross.svg" alt="">
                                        </div>`;
            input.value = "";

            // refresh the items left
            itemsLeft.innerHTML = document.querySelectorAll(".incomplete").length;
        }
    } 
});


// add click to all list because we can't select items before we create it(new todo adding)
todos.addEventListener('click', function(e){
    // on click on the bullet 
    if (e.target.parentNode.parentNode.classList.contains("todo-item")){
        
        // add class complete(make line throw on word)  when click on bullet 
        if(e.target.parentNode.parentNode.classList.contains("completed")){

            e.target.parentNode.parentNode.classList.remove("completed");
            e.target.parentNode.parentNode.classList.add("incomplete");
            // refresh the items left
            itemsLeft.innerHTML = document.querySelectorAll(".incomplete").length;
        }else{
            
            e.target.parentNode.parentNode.classList.add("completed");
            e.target.parentNode.parentNode.classList.remove("incomplete");
            // refresh the items left
            itemsLeft.innerHTML = document.querySelectorAll(".incomplete").length;
        }
    }

    // delete todo when click on cross button
    if(e.target.classList.contains("cross")){
        e.target.parentNode.remove();
        // refresh the items left
        itemsLeft.innerHTML = document.querySelectorAll(".incomplete").length;
    }

////////////////////////// organize todos ///////////////////////////////

    // organizing todo list when click on all,active and complete
    // click on all
    SelectItems[0].onclick = function (){

        //add class active to change color
        this.classList.add("active");
        SelectItems[1].classList.remove("active");
        SelectItems[2].classList.remove("active");

        // loop on todos to make them all visible
        document.querySelectorAll(".todo-item").forEach(element => {
            //show all
            element.style.display = "flex";
        });
    }

    //click on active todos
    SelectItems[1].onclick = function (){

        //add class active to change color
        this.classList.add("active");
        SelectItems[0].classList.remove("active");
        SelectItems[2].classList.remove("active");

        // loop on todos to select the active todos by class incomplete
        document.querySelectorAll(".todo-item").forEach(element => {
            if(element.classList.contains("incomplete")){

                //show the items to avoid being hide after click completed
                element.style.display = "flex";
            }
            if(element.classList.contains("completed")){

                //hide the completed elemets 
                element.style.display = "none";
            }
        });
    }

    //click on completed todos
    SelectItems[2].onclick = function (){

        //add class active to change color
        this.classList.add("active");
        SelectItems[1].classList.remove("active");
        SelectItems[0].classList.remove("active");

        document.querySelectorAll(".todo-item").forEach(element => {
            if(element.classList.contains("incomplete")){

                //hide the incomplete items to show only completed
                element.style.display = "none";
            }
            if(element.classList.contains("completed")){

                //show completed items
                element.style.display = "flex";// flex or block depends on what you set on your style
            }
        });
    }


    //click on clear completed to delete completed
    document.querySelector(".clear-complete").onclick = function () {
        
        document.querySelectorAll(".completed").forEach(ele => {
            
            ele.remove();
        });
    }

//end of event listened 
});



//change the mode between dark and light
document.querySelector(".vision").onclick = function(){

    //sorry i make it complicated, I'm stupid i know it haha
    if(this.src == (location.protocol+ "//" +location.host+"/images/icon-sun.svg")){
        console.log(this)
        this.src = "images/icon-moon.svg";
        document.querySelector(".styler").href = "css/light.css";
    }else{

        this.src = "images/icon-sun.svg";
        document.querySelector(".styler").href = "css/dark.css";
    }
}



// make todos can be draggable by mouse
Sortable.create(listContainer, { 
    animation: 150
 });