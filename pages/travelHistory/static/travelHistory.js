
function openPopup(){
popup.classList.add("open-popup");
}

function displayError(message) {
    let systemMessageHistPage = document.getElementById("systemMessageHistPage");
    systemMessageHistPage.textContent = message;
    systemMessageHistPage.classList.add("open-error");
    setTimeout(function () {
        systemMessageHistPage.classList.remove("open-error");
    }, 4000);
}

function checkRadio(){
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        const userName = document.getElementById("showTravelButton").getAttribute("value");
        console.log(`check radio: username: ${userName}`)

        selectedOption.checked = false;
        const travelId=selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
         fetch('/showTravel/' + travelId)
            .then(response => {
                    window.location.href = '/showTravel' + travelId
            })
            .catch(error => console.error('Error show travel:', error));
    } else {
        console.log("No selected option");
        displayError("Please choose a ride first")
    }
}


function checkRadioRemove() {
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        // const userName = document.getElementById("remove").getAttribute("value");
        const travelId =  selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        console.log('id of selected ride' + travelId);
        fetch('/get_ride_session/' + travelId)
            .then(response => response.json())
            .then(data => {
                if (data['email_user'] == data['email_driver']) {
                    console.log(data['email_user']);
                    console.log('emailDriver ' + data['email_driver']);
                    displayError("You cannot unsubscribe from your ride!");
                } else {
                   console.log('else: popup yoe remove and do what you need in the db')
                    fetch('/remove_from_ride/' + data['id_ride'])
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                    openPopup()

                            } else {
                                // Handle errors or display error messages
                                console.error('Error:', data.message);
                            }
                        })
                        .catch(error => {
                            // Handle fetch errors
                            console.error('Fetch error:', error);
                        });
                }
            });
    } else {
        displayError("Please choose a ride first");
    }
}

function  reload() {
     window.location.reload();
}