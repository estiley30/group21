
document.getElementById("showTravelButton").addEventListener("click", checkRadio);
let systemMessageHistPage= document.getElementById("systemMessageHistPage");
// const radio= document.querySelectorAll('selectRow');

function displayError(){
systemMessageHistPage.classList.add("open-error");
    setTimeout(function () {
        systemMessageHistPage.classList.remove("open-error");
    }, 4000);
}
function checkRadio(){
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        console.log("Selected option found");
        selectedOption.checked = false;
        window.location.href = "showTravel.html"
    } else {
        console.log("No selected option");
        displayError()
    }
}