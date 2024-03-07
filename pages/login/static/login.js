
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click',checkValue)

function goHomeScreen(){
    window.location.href = 'home.html';
}
function checkValue(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in both Username and Password fields."); //call to Jael's func!!
        return false; // Prevent form submission
    }

    // Continue with form submission if both fields are filled
    goHomeScreen();
    return true;
}