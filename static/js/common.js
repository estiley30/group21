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
       return false;
    }else if(!containsOnlyEnglishLetters(cityValue)){
        setError(city, 'Enter a city in English only')
       return false;
    }else{
        setSuccess(city);
        return true;
    }
}
export {checkCity}

 const checkStreet=(streetValue, street) =>{
   if(!doesNotContainNumbers(streetValue)||streetValue.length===1){
        setError(street, 'Enter a valid street!')
       return false;
    }else if(!containsOnlyEnglishLetters(streetValue)){
        setError(street, 'Enter a street in English only')
       return false;
    }else{
        setSuccess(street);
        return true;
    }
}
export {checkStreet}
/////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////22/3
