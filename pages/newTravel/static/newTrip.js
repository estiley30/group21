console.log('hii2')
import {setError, setSuccess, doesNotContainNumbers, containsOnlyEnglishLetters, checkCity, checkStreet, checkNumber} from '../../static/common.js';
// import { setSuccess } from './signUp.js';
const tripForm=document.querySelector('#tripForm')
const citySource=document.querySelector('#citySource')
const streetSource=document.querySelector('#streetSource')
const numberSource=document.querySelector('#numberSource')
const cityDestination=document.querySelector('#cityDestination')
const streetDestination=document.querySelector('#streetDestination')
const numberDestination=document.querySelector('#numberDestination')
const dateTrip=document.querySelector('#dateTrip')
const timeTrip=document.querySelector('#timeTrip')
const numOfPlc=document.querySelector('#numOfPlc')
const price=document.querySelector('#price')

//////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to city input
    citySource.addEventListener('input', function() {
        // Enable or disable street and house number based on whether city is filled
        if (citySource.value.trim() !== '') {
            streetSource.disabled = false;
            numberSource.disabled = false;

        }else {
            streetSource.disabled = false;
            numberSource.disabled = false;
            streetSource.value = '';
            numberSource.value = '';
        }
    })
})
 tripForm.addEventListener('submit',e=> {
     e.preventDefault()
     validateTripInputs();
 })
//////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to city input
    cityDestination.addEventListener('input', function() {
        // Enable or disable street and house number based on whether city is filled
        if (cityDestination.value.trim() !== '') {
            streetDestination.disabled = false;
            numberDestination.disabled = false;

        }else {
            streetDestination.disabled = false;
            numberDestination.disabled = false;
            streetDestination.value = '';
            numberDestination.value = '';
        }
    })
})
////////////////////////////////
 tripForm.addEventListener('submit',e=> {
     e.preventDefault()
     validateTripInputs();
 })

 const validateTripInputs=()=> {
     const citySourceValue = citySource.value.trim()
     const streetSourceValue = streetSource.value.trim()
     const numberSourceValue = numberSource.value.trim()
     const cityDestinationValue = cityDestination.value.trim()
     const streetDestinationValue = streetDestination.value.trim()
     const numberDestinationValue = numberDestination.value.trim()
     const dateTripValue = dateTrip.value.trim()
     const timeTripValue = timeTrip.value.trim()
     const numOfPlcValue = numOfPlc.value.trim()
     const priceValue = price.value.trim()


     // citySource
     if (citySourceValue === '') {
         setError(citySource, 'city is required!')
     } else {
         // setSuccess(citySource);
         checkCity(citySourceValue,citySource);
     }
     // streetSource
     checkStreet(streetSourceValue, streetSource);
     // numberSource
     checkNumber(numberSourceValue, numberSource);
     // cityDestination
     if (cityDestinationValue === '') {
         setError(cityDestination, 'city is required!')
     } else {
         checkCity(cityDestinationValue,cityDestination);
     }
     // streetDestination
     checkStreet(streetDestinationValue, streetDestination);
     // numberSource
     checkNumber(numberDestinationValue, numberDestination);
     // //date
     if (dateTripValue === '') {
         setError(dateTrip, 'date is required!')

     } else {
         setSuccess(dateTrip);
     }
     // //time
     if (timeTripValue === '') {
         setError(timeTrip, 'time is required!')

     } else {
         setSuccess(timeTrip);
     }
     // //numOfPlc
     if (numOfPlcValue === '') {
         setError(numOfPlc, 'numOfPlc is required!')

     } else {
         checkNumber(numOfPlcValue, numOfPlc);
     }
     //price
     if (priceValue === '') {
         setError(price, 'price is required!')

     } else {
         checkNumber(priceValue, price);
     }
 }