function done() {
    const paragraph1 = document.getElementById("edit");
    paragraph1.contentEditable = false;
    paragraph1.style.backgroundColor = "white";

    const paragraph2 = document.getElementById("edit1");
    paragraph2.contentEditable = false;
    paragraph2.style.backgroundColor = "white";

    const paragraph3 = document.getElementById("edit2");
    paragraph3.contentEditable = false;
    paragraph3.style.backgroundColor = "white";

    const paragraph4 = document.getElementById("edit3");
    paragraph4.contentEditable = false;
    paragraph4.style.backgroundColor = "white";

    const paragraph5 = document.getElementById("edit4");
    paragraph5.contentEditable = false;
    paragraph5.style.backgroundColor = "white";

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\d{10}$/;

    var phone=document.getElementById("phone").innerHTML;
    var email=document.getElementById("email").innerHTML;

    if(!phoneRegex.test(phone)) {
        alert("Invalid phone number");
    }

    if(!emailRegex.test(email)) {
        alert("invalid email address");
    }

    var done = document.getElementById("donespace");
    done.style.display="none";
    window.location.href = "/profile"
}

let v = 1;

function myFunction() {
    const node = document.createElement("button");
    node.innerHTML="Done";
    node.onclick = "done();";
    node.style.backgroundColor = "#c2fbd7";
    node.style.borderRadius = "100px";
    node.style.border = "none";
    node.style.boxShadow = "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px";
    node.style.color = "green";
    node.style.padding = "7px 20px";
    node.style.height = "40px";
    node.style.display = "block";

    const paragraph1 = document.getElementById("edit");
    paragraph1.contentEditable = true;
    paragraph1.style.backgroundColor = "#dddbdb";

    const paragraph2 = document.getElementById("edit1");
    paragraph2.contentEditable = true;
    paragraph2.style.backgroundColor = "#dddbdb";

    const paragraph3 = document.getElementById("edit2");
    paragraph3.contentEditable = true;
    paragraph3.style.backgroundColor = "#dddbdb";

    const paragraph4 = document.getElementById("edit3");
    paragraph4.contentEditable = true;
    paragraph4.style.backgroundColor = "#dddbdb";

    const paragraph5 = document.getElementById("edit4");
    paragraph5.contentEditable = true;
    paragraph5.style.backgroundColor = "#dddbdb";

    let parent = document.getElementById("donespace");

    if (v==1) {
    parent.appendChild(node);
    v=v+1;
    }
}