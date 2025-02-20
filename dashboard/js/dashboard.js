// start logout //
var logoutbtn = document.querySelector('#logout-btn');

if (logoutbtn) {
    logoutbtn.onclick = function() {
        this.innerHTML = "Please wait....";
        this.disabled = true;
        this.style.background = "#ccc";  // Corrected the property name

        setTimeout(function() {
            window.location = "../company/company.html";
        }, 2000);  // Added delay
    };
} else {
    console.error("Logout button not found!");
}
// start coding for save subject

var visiblesubject=document.querySelector(".visible-subject");
var subjectbtn=document.querySelector(".subject-btn");
var subjectel=document.querySelector(".subject");
subjectbtn.onclick=function(e){
    e.preventDefault();
    if(subjectel.value !=""){
      newsubject();
        }
     else{
        swal("Subject is empty!!", "please enter subject", "error");
    }  

}
function newsubject() {
    var subjectName = subjectel.value.trim(); // Get the input value

    if (subjectName !== "") {
        // Find the "Manage Subjects" list
        var manageSubjects = document.querySelector(".visible-subject");

        if (manageSubjects) {
            // Add subject dynamically
            manageSubjects.innerHTML += `
                <a href="#" class="list-group-item list-group-item-action">${subjectName}</a>
            `;

            subjectel.value = ""; // Clear input field
        } else {
            console.error("Manage Subjects section not found!");
        }
    } else {
        swal("Subject is empty!", "Please enter a subject.", "error");
    }
}

