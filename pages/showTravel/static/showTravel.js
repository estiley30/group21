
function toMyTravel(){
   window.location.href = '/travelHistory';
}
function openPopup(){
popup.classList.add("open-popup");
}


function displayError(message) {
    let systemMessageShowPage = document.getElementById("systemMessageShowPage");
    systemMessageShowPage.textContent = message;
    systemMessageShowPage.classList.add("open-error");
    setTimeout(function () {
        systemMessageShowPage.classList.remove("open-error");
    }, 4000);
}

function toDelete() {
        const travelId=  document.getElementById('tripId').value;
        console.log('id of selected ride' + travelId);
        fetch('/Number_of_subscribers/' + travelId)
            .then(response => response.json())
            .then(data => {
                if (data['number'] != "0") {
                    displayError("You cannot delete this ride because have trempists!");
                } else {
                   console.log('else: popup yoe delete and do what you need in the db')
                    fetch('/delete_ride/' + data['id_ride'])
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
}