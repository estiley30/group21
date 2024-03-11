
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
        let searchDate= dateFixer(dateSearchBar.value);

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

function dateFixer(dateAsYYYYMMDD) {
  const aYear = dateAsYYYYMMDD.slice(2, 4); //work only for year>2000!
  const aMonth = dateAsYYYYMMDD.slice(5, 7);
  const aDay = dateAsYYYYMMDD.slice(8, 10);
  return `${aDay}.${aMonth}.${aYear}`
}
function openPopup(){
popup.classList.add("open-popup");
}
function closePopup(){
popup.classList.remove("open-popup");
}

function displayError(){
systemMessageSchdlPage.classList.add("open-error");
    setTimeout(function () {
        systemMessageSchdlPage.classList.remove("open-error");
    }, 4000);
}

// function registerForRide() {
//     console.log("registerForRide:");
//
//     let selectedOption = document.querySelector('input[name="selectRow"]:checked');
//     if (selectedOption) {
//         selectedOption.checked = false;
//         openPopup()
//     } else {
//         displayError()
//     }
// }



// Define a global variable to store the selected trip data
let selectedTripData;

// Function to register for a ride
function registerForRide() {
    console.log("registerForRide:");

    // Get the selected option
    let selectedOption = document.querySelector('input[name="selectRow"]:checked');
    if (selectedOption) {
        // Store the selected trip data
        selectedTripData = {
            _id: selectedOption.value,
            date: selectedOption.parentNode.nextElementSibling.innerText,
            time: selectedOption.parentNode.nextElementSibling.nextElementSibling.innerText,
            source: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            destination: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            max: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            driver: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            price: selectedOption.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        };

        // Open the popup
        openPopup();
    } else {
        displayError();
    }
}

// Function to close the popup and redirect to travel history page
function closePopupAndRedirect() {
    const selectedTripId = selectedTripData._id;
    console.log("id:"+selectedTripId);

    // Insert the selected trip data into the ride table collection
    fetch('/register_for_ride/' + selectedTripId)
        .then(response => {
            if (response.ok) {
                // Close the popup
                closePopup();

                // Redirect to the travel history page
                ///need to go to /travelHistory/<userEmail>!!!!!!!
                window.location.href = '/travelHistory';
            } else {
                console.error('Failed to register for ride');
            }
        })
        .catch(error => console.error('Error registering for ride:', error));
}
