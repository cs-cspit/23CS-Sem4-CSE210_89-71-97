var startQuizBtn = document.querySelector(".start-quiz-btn");

startQuizBtn.onclick = function(){
    if("choose subject"){
        alert("Success");
    }else{
        swal("Select Subject !", "Please select subject first !", "warning");
    }
}