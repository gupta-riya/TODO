
colors = document.getElementsByClassName(".colors")


var myFunction = function () {

    console.log("clicked");
}

for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', myFunction, false);
}




let colorBtn = document.querySelectorAll(".filter_color");
let mainCont = document.querySelector(".main-container");

for (let i = 0 ; i < colorBtn.length ; i++)
{
    colorBtn[i].addEventListener("click", function(e){

        // class list will give all the classes associated with the element
        //console.log(colorBtn[i].classList[1]);
        let color = colorBtn[i].classList[1];
        mainCont.style.backgroundColor = color;

    })
}
