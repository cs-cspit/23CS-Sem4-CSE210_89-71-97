var logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function(){
    // alert();
    this.innerHTML = "Please Wait..";
}

logoutBtn.addEventListener('click',(event)=>{
    // alert();
    event.target.innerHTML = "Please Wait..";
})