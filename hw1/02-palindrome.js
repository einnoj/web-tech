const elem = document.querySelector('input');

// selecting the result class to display the result of whether the input is a palindrome
const result = document.querySelector('.result');

elem.addEventListener('input', handleInput);

// will handle the input event and log whether the input value is a palindrome
function handleInput(event) {
    // makes it easier to write the value instead of event.target.value
    const value = event.target.value;

    // will check if the value is negative, display message in red color 
    if (value < 0) {
        result.style.color = 'red';
        return result.innerHTML = 'The input is not a POSITIVE number!';
    }

    // using console log, realized that empty input was considered a palindrome
    // if the input is empty it will be false
    if (value === '') {
        // resets the result innerHTML to be empty
        return result.innerHTML = '';
    }

    // if the input is not a number it will be false
    if (isNaN(value)) {
        result.style.color = 'red';
        return result.innerHTML = 'The input is not a number!';
    }

    // else it will check if the number is a palindrome
    // convert the value to a string to make it easier to reverse and check
    const strValue = String(value);
    // reverse the number/string
    const reversedValue = strValue.split('').reverse().join('');
    // check if the original value is the same as the reversed value
    const checkPalindrome = strValue === reversedValue;

    // if it is a palindrome it will return "is a palindrome" if false "is not a palindrome"
    if (checkPalindrome) {
        result.style.color = 'green';
        return result.innerHTML = `${value} is a palindrome`;
    }
    else {
        result.style.color = 'red';
        return result.innerHTML = `${value} is not a palindrome`;
    }

}

