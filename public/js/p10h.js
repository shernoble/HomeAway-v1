function increment() {
  let oldinput=document.getElementById("valueinput").value;
  let x=100;
  oldinput=+oldinput+ +x;
  document.getElementById("valueinput").value = oldinput;
}
function decrement() {
  var oldinput=document.getElementById("valueinput").value;
  oldinput=oldinput-100;
  if(oldinput<850){
  alert("Minimum price is ₹850");
  document.getElementById("valueinput").value = 850;
  }
  else document.getElementById("valueinput").value = oldinput;
}