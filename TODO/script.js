
let colorBtn = document.querySelectorAll(".filter");
let mainCont = document.querySelector(".main-container");
let body = document.body;
let plusButton = document.querySelector(".fa-plus");


for (let i = 0 ; i < colorBtn.length ; i++)
{
    colorBtn[i].addEventListener("click", function(e){

        // class list will give all the classes associated with the element
        //console.log(colorBtn[i].classList[1]);
        let color = colorBtn[i].children[0].classList[1];
        mainCont.style.backgroundColor = color;

    })
}


plusButton.addEventListener("click",function(){

    createModal();
    addModalEvents();
 
})


function createModal()
{
    
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class","modal_container");
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

function addModalEvents()
{
    let colorList = document.querySelectorAll(".modal_filter_container .filter_task");
    let selectedColor = "black";

    colorList[0].classList.add("border");  
    for(let i = 0 ; i < colorList.length ; i++)
    {
        colorList[i].addEventListener("click", function(e){

          colorList.forEach((filter)=>{
              filter.classList.remove("border");
          })
           
           colorList[i].classList.add("border");   
           selectedColor = colorList[i].classList[1];        

        })
    }

    let input = document.querySelector(".modal_input");

    input.addEventListener("keydown", function (e){

        if (e.key == "Enter"){

            var inputText = input.value;
            document.querySelector(".modal_container").remove();
            addTask(selectedColor,inputText);
            

        }
    })
}

function addTask(color,text)
{
    let taskCont = document.createElement("div");
    taskCont.setAttribute("class","task_container");
    taskCont.innerHTML = `<div class="task_container ">
    <div class="task_header_color ${color}"></div>
    <div class="task_body">
        <div class="uid">#Example</div>
        <div class="task_desc">${text}</div>
    </div>
    </div>
    `

    document.querySelector(".main-container").appendChild(taskCont);

}