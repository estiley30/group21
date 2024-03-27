
const popup = document.getElementById("popup");
let systemMessageSchdlPage= document.getElementById("systemMessageSchdlPage");
let sourceSearchBar= document.querySelector(".search-input.sourceSearch");
let destinationSearchBar = document.querySelector(".search-input.destinationSearch");
let dateSearchBar = document.querySelector(".search-input.dateSearch");
let tbody = document.getElementById("tbody");
let originalTableData = tbody.innerHTML;

sourceSearchBar.addEventListener('input', search)
destinationSearchBar.addEventListener('input', search)
dateSearchBar.addEventListener('input', search)

function search(){
    tbody.innerHTML= originalTableData;
    let rows= tbody.children //all the tr tags

    if(sourceSearchBar.value.length<1 && destinationSearchBar.value.length<1 && !dateSearchBar.value )
        return;

        let filteredRows= '';
        let searchSourceText = sourceSearchBar.value.toLowerCase();
        let searchDestinationText = destinationSearchBar.value.toLowerCase();
        let searchDate= dateSearchBar.value;

        for (let i=0; i< rows.length; i++){
            const currentSourceRowText = rows[i].children[3].innerText.toLowerCase();
            const currentDestinationRowText = rows[i].children[4].innerText.toLowerCase();
            const currentDateRow= rows[i].children[1].innerText.toString();

             if(sourceSearchBar.value.length>0 && destinationSearchBar.value.length>0 && dateSearchBar.value){
                if(currentSourceRowText.startsWith(searchSourceText) &&
                    currentDestinationRowText.startsWith(searchDestinationText) &&
                    (currentDateRow === searchDate)){
                    console.log(currentDateRow)
                filteredRows+= rows[i].outerHTML; //current tr
                }
            }
            else if(sourceSearchBar.value.length>0 && destinationSearchBar.value.length>0 && !dateSearchBar.value){
                if(currentSourceRowText.startsWith(searchSourceText) && currentDestinationRowText.startsWith(searchDestinationText)){
                filteredRows+= rows[i].outerHTML; //current tr
                }
            }
            else if(sourceSearchBar.value.length>0 && destinationSearchBar.value.length<1 && !dateSearchBar.value){
                if(currentSourceRowText.startsWith(searchSourceText)){
                    filteredRows+= rows[i].outerHTML; //current tr
                }
            }
            else if(sourceSearchBar.value.length>0 && destinationSearchBar.value.length<1 && dateSearchBar.value){
                if(currentSourceRowText.startsWith(searchSourceText)&&
                    (currentDateRow === searchDate)){
                    filteredRows+= rows[i].outerHTML; //current tr
                }
            }
             else if(destinationSearchBar.value.length>0 &&
                     sourceSearchBar.value.length<1 &&
                     !dateSearchBar.value){
                if(currentDestinationRowText.startsWith(searchDestinationText)){
                    filteredRows+= rows[i].outerHTML; //current tr
                }
            }
             else if(destinationSearchBar.value.length>0 &&
                     sourceSearchBar.value.length<1 &&
                     dateSearchBar.value){
                if(currentDestinationRowText.startsWith(searchDestinationText)&&
                    (currentDateRow === searchDate)){
                    filteredRows+= rows[i].outerHTML; //current tr
                }
            }
             else if(destinationSearchBar.value.length<1 &&
                     sourceSearchBar.value.length<1 &&
                     dateSearchBar.value){
                 if(currentDateRow === searchDate){
                    filteredRows+= rows[i].outerHTML; //current tr
                }
             }
        }
        tbody.innerHTML= filteredRows;
}

function openPopup(){
popup.classList.add("open-popup");
}
function closePopup(){
popup.classList.remove("open-popup");
}

function displayError(message) {
    let systemMessageSchdlPage = document.getElementById("systemMessageSchdlPage");
    systemMessageSchdlPage.textContent = message;
    systemMessageSchdlPage.classList.add("open-error");
    setTimeout(function () {
        systemMessageSchdlPage.classList.remove("open-error");
    }, 4000);
}

let travelId;

// Function to register for a ride
function registerForRide() {
    console.log("registerForRide:");
    // Get the selected option
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        travelId=selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        fetch('/get_ride_session/' + travelId)
            .then(response => response.json())
            .then(data => {
                if (data['email_user'] == data['email_driver']) {
                    console.log(data['email_user'])
                    console.log('emailDriver '+data['email_driver'])
                    displayError(" You can't register to your own ride!");

                } else {
                    fetch('/is_one_ride/' + travelId)
                        .then(response => response.json())
                        .then(data => {
                            if (data['exists']) {
                                displayError(" You can't register to the same ride twice!");
                            } else {
                                openPopup();
                            }
                        });
                }
            });
    } else {
        displayError("Please choose a ride first");
    }
}

// Function to close the popup and redirect to travel history page
function closePopupAndRedirect() {
    const selectedTripId = travelId;
    console.log("id:" + selectedTripId);

    // Insert the selected trip data into the ride table collection
    fetch('/register_for_ride/' + selectedTripId)
        .then(response => {
            if (response.ok) {
                // Close the popup
                closePopup();
                window.location.href = '/travelHistory';
            } else {
                console.error('Failed to register for ride');
            }
        })
        .catch(error => console.error('Error registering for ride:', error));
}
