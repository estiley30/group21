console.log('hii2');
import { setError, setSuccess, doesNotContainNumbers, containsOnlyEnglishLetters, checkCity, checkStreet} from '../../static/js/common.js';
const tripForm = document.querySelector('#tripForm');
const citySource = document.querySelector('#citySource');
const streetSource = document.querySelector('#streetSource');
const numberSource = document.querySelector('#numberSource');
const cityDestination = document.querySelector('#cityDestination');
const streetDestination = document.querySelector('#streetDestination');
const numberDestination = document.querySelector('#numberDestination');
const dateTrip = document.querySelector('#dateTrip');
const timeTrip = document.querySelector('#timeTrip');
const numOfPlc = document.querySelector('#numOfPlc');
const price = document.querySelector('#price');


 setTimeout(function() {
     let errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }, 3000);
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to city input
    citySource.addEventListener('input', function() {
        // Enable or disable street and house number based on whether city is filled
        if (citySource.value.trim() !== '') {
            streetSource.disabled = false;
            numberSource.disabled = false;

        } else {
            streetSource.disabled = false;
            numberSource.disabled = false;
            streetSource.value = '';
            numberSource.value = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to city input
    cityDestination.addEventListener('input', function() {
        // Enable or disable street and house number based on whether city is filled
        if (cityDestination.value.trim() !== '') {
            streetDestination.disabled = false;
            numberDestination.disabled = false;

        } else {
            streetDestination.disabled = false;
            numberDestination.disabled = false;
            streetDestination.value = '';
            numberDestination.value = '';
        }
    });
});

tripForm.addEventListener('submit', e => {
     e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs
    let isValidTrip = false;
    isValidTrip= validateTripInputs();
    console.log('isValidTrip=' + isValidTrip)
    // If all inputs are valid, submit the form
    if (isValidTrip) {
        tripForm.submit();
    }
});

const validateTripInputs = () => {
    console.log('validateTripInputs')
    const citySourceValue = citySource.value.trim();
    const streetSourceValue = streetSource.value.trim();
    const cityDestinationValue = cityDestination.value.trim();
    const streetDestinationValue = streetDestination.value.trim();
    let dateTripValue = new Date(dateTrip.value.trim());
    dateTripValue.setHours(0, 0, 0, 0);
    const timeTripValue = timeTrip.value.trim();
    const numOfPlcValue = numOfPlc.value.trim();
    const priceValue = price.value.trim();
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const today = new Date();
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();
    const timeParts = timeTripValue.split(":");
    const tripHours = parseInt(timeParts[0], 10);
    const tripMinutes = parseInt(timeParts[1], 10);

    // citySource
    if (citySourceValue === '') {
        setError(citySource, 'City is required!');
        return false;
    } else if(!checkCity(citySourceValue, citySource)){
            return false;
    }
    if (streetSourceValue && !checkStreet(streetSourceValue, streetSource)){
        return false;
    }
    if (cityDestinationValue === '') {
        setError(cityDestination, 'City is required!');
        return false;
    } else if(!checkCity(cityDestinationValue, cityDestination)){
        return false;
    }
    if (streetDestinationValue && !checkStreet(streetDestinationValue, streetDestination)){
        return false;
    }

    if((dateTripValue && dateTripValue<todayDate) || !dateTripValue){
        setError(dateTrip, 'Future date is required!');
        return false;
    }
    setSuccess(dateTrip);
    if(timeTripValue&& ((dateTripValue.getTime() === todayDate.getTime()) && (tripHours < currentHours || ((tripHours === currentHours) && (tripMinutes <= currentMinutes))) )){
        setError(timeTrip, 'Future time is required!');
        return false;
    }
    setSuccess(timeTrip);
    if(!numOfPlcValue){
        setError(numOfPlc, 'Number required!');
        return false;
    }
    setSuccess(numOfPlc);
    if(!priceValue){
        setError(price, 'price required!');
        return false;
    }
    setSuccess(price);
    return true;
};

