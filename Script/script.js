const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function FbotonOn(msg) {
    var empt = document.forms["sendE"][input].value
    if (empt == "") {
        return
    }

    if (msg != undefined) {
        document.getElementById("boxTxt").innerHTML = msg;
        document.getElementById("boxBack").classList.add("show");

    } else { document.getElementById("boxBack").classList.remove("show"); }

}
