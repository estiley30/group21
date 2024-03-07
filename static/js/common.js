 const setError=(element, message)=>{

    const inputControl= element.parentElement;
    const errorDisplay= inputControl.querySelector('.error');
    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

 }
 export {setError};

const setSuccess= element=>{
    const inputControl= element.parentElement;
    const errorDisplay= inputControl.querySelector('.error');

    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

 }
 export {setSuccess};

const doesNotContainNumbers=(str) =>{
    return /^\D*$/.test(str);
}
export {doesNotContainNumbers};

const containsOnlyEnglishLetters=(str) =>{
    if(str=== ''){
        return true;
    }
    return /^[a-zA-Z\s]+$/.test(str);
}
export {containsOnlyEnglishLetters};

const checkCity=(cityValue, city)=>{
   if(!doesNotContainNumbers(cityValue)||cityValue.length===1){
        setError(city, 'Enter a valid city!')
    }else if(!containsOnlyEnglishLetters(cityValue)){
        setError(city, 'Enter a city in English only')
    }else{
        setSuccess(city);
    }
}
export {checkCity}

 const checkStreet=(streetValue, street) =>{
   if(!doesNotContainNumbers(streetValue)||streetValue.length===1){
        setError(street, 'Enter a valid street!')
    }else if(!containsOnlyEnglishLetters(streetValue)){
        setError(street, 'Enter a street in English only')
    }else{
        setSuccess(street);
    }
}
export {checkStreet}

 const checkNumber=(numberValue,number)=> {
    if(numberValue==='') {
        setSuccess(number);
    }else if(numberValue<1){
        setError(number, 'Enter a valid number!');
    }else{
        setSuccess(number);
    }
}
export {checkNumber}