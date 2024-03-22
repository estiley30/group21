let selectedTravelData;
// document.getElementById("showTravelButton").addEventListener("click", checkRadio);
let systemMessageHistPage= document.getElementById("systemMessageHistPage");
// const radio= document.querySelectorAll('selectRow');

///////////////////////////////
function openPopup(){
popup.classList.add("open-popup");
}
////////////////////////////////////
function displayError(){
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

        // Store the selected trip data
        selectedTravelData = {
            _id: selectedOption.value,
            date: selectedOption.parentNode.nextElementSibling.innerText,
            time: selectedOption.parentNode.nextElementSibling.nextElementSibling.innerText,
            source: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            destination: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            max: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            driver: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            price: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            id: ""

        };
        if(selectedTravelData.driver != 'Me'){
            selectedTravelData.id = `${selectedTravelData.driver}_${selectedTravelData.date.toString()}_${selectedTravelData.time.toString()}`
        } else {
            selectedTravelData.id=`${userName}_${selectedTravelData.date.toString()}_${selectedTravelData.time.toString()}`
        }
        console.log("id to show:"+selectedTravelData.id );
        selectedOption.checked = false;
        const id=selectedTravelData.id
         fetch('/showTravel/' + id)
            .then(response => {
                    window.location.href = '/showTravel' + id
            })
            .catch(error => console.error('Error show travel:', error));
    } else {
        console.log("No selected option");
        displayError()
    }
}
                // window.location.href = '/showTravel' + selectedTripData.id

///////////////////////////////////////////////////////////////////////////////22/3


// function displaySuccessMessage() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const successMessage = urlParams.get('success_message');
//     // if (successMessage) {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('success-message');
//         messageElement.textContent = successMessage;
//         document.body.appendChild(messageElement);
//         // Fade out the message after 3 seconds
//         setTimeout(() => {
//             messageElement.style.opacity = 0;
//             setTimeout(() => {
//                 messageElement.remove();
//             }, 1000); // Remove after fade out animation (1 second)
//         }, 3000); // Fade out after 3 seconds
//     // }
// }

// Call the function when the page loads
// window.addEventListener('load', displaySuccessMessage);



function checkRadioRemove() {
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        const userName = document.getElementById("remove").getAttribute("value");

        // Store the selected trip data
        selectedTravelData = {
            _id: selectedOption.value,
            date: selectedOption.parentNode.nextElementSibling.innerText,
            time: selectedOption.parentNode.nextElementSibling.nextElementSibling.innerText,
            source: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            destination: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            max: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            driver: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            price: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            id: ""
        };
        if (selectedTravelData.driver != 'Me') {
            selectedTravelData.id = `${selectedTravelData.driver}_${selectedTravelData.date.toString()}_${selectedTravelData.time.toString()}`
        } else {
            selectedTravelData.id = `${userName}_${selectedTravelData.date.toString()}_${selectedTravelData.time.toString()}`
        }
        // selectedTripData.id = `${selectedTripData.driver}_${selectedTripData.date.toString()}_${selectedTripData.time.toString()}`
        console.log('id of selected ride' + selectedTravelData.id);
        fetch('/get_ride_session/' + selectedTravelData.id)
            .then(response => response.json())
            .then(data => {
                if (data['email_user'] == data['email_driver']) {
                    console.log(data['email_user']);
                    console.log('emailDriver ' + data['email_driver']);
                    displayError(" You can't register to your own ride!");
                    //add displatError!!!!!!!! you cant remove from yours travel
                } else {
                   console.log('else: popup yoe remove and do what you need in the db')
                    fetch('/remove_from_ride/' + data['id_ride'])
                        .then(response => response.json())
                        .then(data => {
                            // Handle the JSON response
                            if (data.success) {
                                // Update the page content or perform any necessary actions
                                // For example, you can display a success message or reload certain parts of the page
                                // displaySuccessMessage(data.message)
                                console.log(data.message);
                                // Reload the page after a short delay (optional)
                                openPopup()
                                // setTimeout(() => {
                                    window.location.reload();
                                // }, 1000); // Reload after 1 second (adjust as needed)
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
                // console.log('2'+check)
                // Use the fetched data
                console.log('USER: ' + data['email_user'] + 'DRIVER: ' + data['email_driver']); // Output: example@example.com
            });
    } else {
        displayError("Please choose a ride first");
    }
}

