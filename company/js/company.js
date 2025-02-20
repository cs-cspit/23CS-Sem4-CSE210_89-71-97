// control coding
var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn"); //login == signin
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");

signupBtn.onclick = function(){
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    loginBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
}

loginBtn.onclick = function(){
    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
}

// register coding
var registerForm = document.querySelector(".signup-form");
var allInput = registerForm.querySelectorAll("input");
// var s_signupBtn = document.querySelector(".s-signup-btn")

registerForm.onsubmit = function(e){
    e.preventDefault();
    registrationData();
}
const registrationData = () => {
    const uname = allInput[1].value;
    if(localStorage.getItem(uname) === null){
        const userData = {
            email : allInput[0].value,
            username : allInput[1].value,
            userid : allInput[2].value,
            branch : allInput[3].value,
            department : allInput[4].value,
            password : allInput[5].value
        }
        let userString = JSON.stringify(userData);//convert data into string
        localStorage.setItem(allInput[1].value, userString);
        registerForm.reset('');
        swal("Good job!!", "Sign Up Successfully..", "success");
        // window.location = "../dashboard/dashboard.html"  // for sign up -> dashboard
    }
    else{
        swal("Error!!", "This Name Is Already Taken..", "error");
    }
}
// signin coding
var signinBtn = document.querySelector(".signin-btn");
var email = document.querySelector("#email");
var username = document.querySelector("#username");
var password = document.querySelector("#password");


signinBtn.onclick = function(e){
    e.preventDefault();
    if(email.value != "" && username.value !="" && password.value != ""){
        if(localStorage.getItem(username.value)){
            var allData = JSON.parse(localStorage.getItem(username.value));
            console.log(allData);
            if(allData.email == email.value){
                if(allData.password == password.value){
                    window.location = "../dashboard/dashboard.html"
                }else{
                    swal("Wrong Password!!", "Please Enter Correct Password..", "warning");
                }
            }else{
                swal("Wrong Email!!", "Please Enter Correct Email..", "warning");
            }
        }else{
            swal("Wrong Username!!", "Please Sign Up First..", "warning");
        } 
    }
    else{
        swal("Empty Field!!", "Please Fill All The Field..", "warning");
    }
}