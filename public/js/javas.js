function validlogin() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var mailid=document.getElementById("email").value;
    if(!emailRegex.test(mailid)) 
    {
        alert("invalid email address");
        
    }
}
function validlogina() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var mailid=document.getElementById("email").value;
    if(!emailRegex.test(mailid)) 
    {
        alert("invalid email address");
        
    }
    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(PhoneNumber))
    {
        alert("invalid phone number");
    }

}
function validsignup()

{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    const phoneRegex = /^\d{10}$/;
    var PhoneNumber=document.getElementById("phnum").value;
    var mailid=document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("confirmpassword").value;
    if(!emailRegex.test(mailid)) {
        alert("invalid email address");
        return false;
    }
    else if(!phoneRegex.test(PhoneNumber))
    {
        alert("invalid phone number");
        return  false;
    }

    else if(!(password.length>=8 || password.length<=24)) {
        alert("Password length should be between 8-24");
        return false;
    }
    else if(!passRegex.test(password)){
        alert("Password must contain minimum eight characters, at least one alphabet, one number and one special character");
        return false;
    }
    else if(password!=password2) {
        alert("Password doesnt match");
        return false;
    }
    else
    {
        return true;
    }
}
var regform=document.getElementById("signupg");
regform.addEventListener("submit",function(e){
    if(validsignup()==false){
        e.preventDefault();
    }

    else{
        console.log("Registered successfully")
    }
})
var regforms=document.getElementById("signup");
regforms.addEventListener("submit",function(e){
    if(validsignup()==false)
    {
        e.preventDefault();
    }

    else
    {
        console.log("Registered successfully")
    }
})

function redirecttologin() 
{
    window.location.href="/login";
}
function redirecttosignup() {
    window.location.href="/signup";
}
function redirecttologing() 
{
    window.location.href="/loging";
}
function redirecttosignupg() {
    window.location.href="/signupg";
}
