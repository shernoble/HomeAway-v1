function formValidate()
{
    const destination=document.getElementById("destination").value;
    const checkin=new Date(document.getElementById("checkin").value);
    const checkout=new Date(document.getElementById("checkout").value);
    const no_guests=document.getElementById("no_guests").value;
    const curr_date=new Date().getTime();
    const chkin = checkin.getTime();
    const chkout = checkout.getTime();
    if(destination=="" || checkin=="" ||checkout=="" || no_guests=="")
    {
        alert("All the fields are required to be filled out");
        return false;
    }
   else if(curr_date>chkin)
   {
        alert("invalid date entry in checkin");
        return false;
    }
    else if(curr_date>chkout)
    {
        alert("invalid date entry in checkout");
        return false;
    }
    else if(chkout<chkin)
    {
        alert("invalid date entries in checkout & checkin");
        return false;
    }
    else
    {
        window.location.href="/results";
        return true;
    }
}