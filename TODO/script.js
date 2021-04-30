
let colorBtn = document.querySelectorAll(".filter");
let mainCont = document.querySelector(".main-container");
let body = document.body;
let plusButton = document.querySelector(".fa-plus");
let availColors = [];

for (let i = 0; i < colorBtn.length; i++) {
    let color = colorBtn[i].children[0].classList[1];
    availColors.push(color);
}

for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (e) {

        // class list will give all the classes associated with the element
        //console.log(colorBtn[i].classList[1]);
        let color = colorBtn[i].children[0].classList[1];


        mainCont.setAttribute("style", "background-color: " + color + " ;");


    })
}


plusButton.addEventListener("click", function () {

    let modalexist = document.querySelectorAll(".modal_container")
    if (modalexist.length == 0) {
        createModal();
        addModalEvents();

    }

})


function createModal() {

    let modal_container = document.createElement("div");
    modal_container.setAttribute("class", "modal_container");
    modal_container.innerHTML = `<div class = "input_container">
    <textarea class="modal_input" placeholder="Enter Your Task Here"></textarea>
    </div>
    <div class="modal_filter_container">

        <div class = "filter_task palevioletred"></div>
        <div class = "filter_task blue"></div>
        <div class = "filter_task limegreen"></div>
        <div class = "filter_task black"></div>


    </div>`


    body.appendChild(modal_container);
}

function addModalEvents() {
    let colorList = document.querySelectorAll(".modal_filter_container .filter_task");
    let selectedColor = "black";

    colorList[3].classList.add("border");
    for (let i = 0; i < colorList.length; i++) {
        colorList[i].addEventListener("click", function (e) {

            colorList.forEach((filter) => {
                filter.classList.remove("border");
            })

            colorList[i].classList.add("border");
            selectedColor = colorList[i].classList[1];

        })
    }

    let input = document.querySelector(".modal_input");

    input.addEventListener("keydown", function (e) {

        if (e.key == "Enter") {

            var inputText = input.value;
            inputText = inputText.trim();
            document.querySelector(".modal_container").remove();
            if (inputText.length > 0) {
                addTask(selectedColor, inputText);
                addTaskEvent();

            }

        }
    })
}

function addTask(color, text) {
    let taskCont = document.createElement("div");
    taskCont.setAttribute("class", "task_container");
    taskCont.innerHTML = `
    <div class="task_header_color ${color}"></div>
    <div class="task_body">
        <div class="uid">#exampleId</div>
        <div contenteditable = "true" class="task_desc">${text}</div>
    </div>
    
    `

    document.querySelector(".main-container").appendChild(taskCont);
    let taskHeader = taskCont.querySelector(".task_header_color");
    taskHeader.addEventListener("click",changeColor);


}

function changeColor(e) {

        // on which we are adding event listener
        //console.log(e.currentTarget);

        // on which the event is occuring
        //console.log(e.target);

        let taskHeader = e.currentTarget;   
        let currcolor = taskHeader.classList[1];
        let idx = availColors.indexOf(currcolor);
        taskHeader.classList.remove(currcolor);
       taskHeader.classList.add(availColors[(idx+1)%4]);
    
}