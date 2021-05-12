
'use strict';

let colorBtn = document.querySelectorAll(".filter");
let mainCont = document.querySelector(".main-container");
let plusButton = document.querySelector(".fa-plus");
let crossButton = document.querySelector(".fa-times")
let body = document.body;
let deleteState = false;
let availColors = [];
let taskArr = [];


if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));

    for (let i = 0; i < taskArr.length; i++) {
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}


for (let i = 0; i < colorBtn.length; i++) {
    let color = colorBtn[i].children[0].classList[1];
    availColors.push(color);
}

for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (e) {

        // class list will give all the classes associated with the element
        //console.log(colorBtn[i].classList[1]);
        let color = colorBtn[i].children[0].classList[1];

        


    })
}


plusButton.addEventListener("click", function () {

    let modalexist = document.querySelectorAll(".modal_container")
    if (modalexist.length == 0) {
        createModal();

    }

})


crossButton.addEventListener("click", setDeleteState);

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
    addModalEvents(modal_container);

}

function addModalEvents(modal_container) {
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
                createTask(selectedColor, inputText, true);


            }

        }
    })
}

function createTask(color, text, flag, id) {
    let taskCont = document.createElement("div");

    let uifn = new ShortUniqueId();
    let uid = id || uifn();
    taskCont.setAttribute("class", "task_container");
    taskCont.innerHTML = `
    <div class="task_header_color ${color}"></div>
    <div class="task_body">
        <div class="uid">#${uid}</div>
        <div contenteditable = "true" class="task_desc">${text}</div>
    </div>
    
    `;

    document.querySelector(".main-container").appendChild(taskCont);
    let taskHeader = taskCont.querySelector(".task_header_color");

    if (flag == true) {
        let obj = { "task": text, "id": `${uid}`, "color": color };
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr);
    }



    taskHeader.addEventListener("click", changeColor);
    taskCont.addEventListener("click", deleteTask);
    let taskDesc = taskCont.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);

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
    idx = (idx + 1) % 4;
    taskHeader.classList.add(availColors[idx]);


    let uidElem = taskHeader.parentNode.querySelector(".uid");
    let uid = uidElem.innerText.split("#")[1];

    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        if (id == uid) {
            taskArr[i].color = availColors[idx];
            console.log(availColors[idx]);
            let finalArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalArr);

            break;
        }
    }


}


function setDeleteState(e) {
    let crossparent = e.currentTarget.parentNode;
    if (deleteState == false) {
        crossparent.classList.add("active");

    }
    else {
        crossparent.classList.remove("active");
    }

    deleteState = !deleteState;
}



function deleteTask(e) {
    let taskCont = e.currentTarget;

    if (deleteState) {

        let uidElem = taskCont.querySelector(".uid");
        let uid = uidElem.innerText.split("#")[1];
        for (let i = 0; i < taskArr.length; i++) {
            let { id } = taskArr[i];
            if (id == uid) {
                taskArr.splice(i, 1);
                let finalArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask", finalArr);
                taskCont.remove();
                break;
            }
        }

    }
}

function editTask(e) {

    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uid = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        if (id == uid) {
            taskArr[i].task = taskDesc.innerText;
            let finalArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalArr);

            break;
        }
    }





}