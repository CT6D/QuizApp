
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

const year = document.getElementById("year");

year.innerText = new Date().getFullYear();

var activepage = window.location.pathname;
const navFooter = document.querySelectorAll(".footer-menu ul li a").forEach(link => {
    if (link.href.includes(`${activepage}`)) {
        link.classList.add("active")
    }
})
