import './style.css'

// email input
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const email = document.querySelector('#email')
const emailError = email.nextElementSibling
const validateEmail = () => {
    if (email.value.length === 0) {
        email.classList.remove('valid', 'invalid')
        emailError.textContent = ""
    }
    else if (emailRegex.test(email.value)) {
        email.classList.remove('invalid')
        email.classList.add('valid')
        emailError.textContent = ''
    }
    else {
        email.classList.remove('valid')
        email.classList.add('invalid')
        emailError.textContent = 'Please enter a valid email adress'
    }
}
email.addEventListener('blur', validateEmail)
email.addEventListener('focus', () => {
    email.classList.remove('valid', 'invalid')
    emailError.textContent = ""
})

// countries input
import { countries } from 'countries-list';
const countrySelect = document.querySelector('#country')
const countriesKeysList = Object.keys(countries)
const countriesOptionList = []

for (let i = 0 ; i < countriesKeysList.length ; i++) {
    const countryOption = document.createElement('option')
    const country = countries[countriesKeysList[i]]
    countryOption.value = country.name
    countryOption.textContent = country.name
    countryOption.dataset.countryId = countriesKeysList[i]
    countriesOptionList.push(countryOption)
}
countriesOptionList.sort((a,b) => a.value.localeCompare(b.value))
countriesOptionList.forEach((el)=> countrySelect.appendChild(el))

countrySelect.selectedIndex = -1
countrySelect.addEventListener('change', function() {
    if (this.value) {
        zipCode.disabled = false
    }
    else {
        zipCode.disabled = true
    }
    validateZipCode()
    countrySelect.classList.add('valid')
})


// zip code input
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';

const zipCode = document.querySelector('#zip-code')
const zipCodeError = zipCode.nextElementSibling
zipCode.disabled = true

function validateZipCode() {
    const selectedCountry = countrySelect.selectedOptions[0].dataset.countryId
    if (zipCode.value.length === 0) {
        zipCode.classList.remove('valid', 'invalid')
        zipCodeError.textContent = ""
    }
    else if (!postcodeValidatorExistsForCountry(selectedCountry)) {
        zipCode.classList.remove('invalid')
        zipCode.classList.add('valid')
        zipCodeError.textContent = ''
    }
    else if (postcodeValidator(zipCode.value, selectedCountry)) {
        zipCode.classList.remove('invalid')
        zipCode.classList.add('valid')
        zipCodeError.textContent = ''
    }
    else if (!postcodeValidator(zipCode.value, selectedCountry)) {
        zipCode.classList.remove('valid')
        zipCode.classList.add('invalid')
        zipCodeError.textContent = 'Please make sure the zip code format corresponds to the country selected'
    }
}

zipCode.addEventListener('blur', validateZipCode)
zipCode.addEventListener('focus', () => {
    zipCode.classList.remove('valid', 'invalid')
    zipCodeError.textContent = ""
})

// Password

const password = document.querySelector('#password')
const passwordError = password.nextElementSibling
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const passRegexMissingNum = /^(?=.*\d)(?=.*[a-zA-Z]).*$/
const passRegexMissingCap = /^(?=.*[A-Z])(?=.*[a-zA-Z]).*$/
const passRegexMissingLow = /^(?=.*[a-z])(?=.*[a-zA-Z]).*$/
const passRegexMinChar = /^(?=.*[a-zA-Z]).{8,}$/


function validatePassword(password, passwordError) {
    if (password.value.length === 0) {
        password.classList.remove('valid', 'invalid')
        passwordError.textContent = ''
        return
    }
    else if (passRegex.test(password.value)) {
        password.classList.remove('invalid')
        password.classList.add('valid')
        passwordError.textContent = ''
        return true
    }
    else if (!passRegexMissingNum.test(password.value)){
        password.classList.remove('valid')
        password.classList.add('invalid')
        passwordError.textContent = 'Password must have at least one number'
    }
    if (!passRegexMissingCap.test(password.value)) {
        password.classList.remove('valid')
        password.classList.add('invalid')
        if (passwordError.textContent == '') {
            passwordError.textContent = 'Password must have at least one uppercase character'
        }
        else passwordError.textContent += ' and at least one uppercase character'
    }
    if (!passRegexMissingLow.test(password.value)) {
        password.classList.remove('valid')
        password.classList.add('invalid')
        if (passwordError.textContent == '') {
            passwordError.textContent = 'Password must have at least one lowercase character'
        }
        else passwordError.textContent = passwordError.textContent.replace(' and', ',') + ' and at least one lowercase character'
    }
    if (!passRegexMinChar.test(password.value)) {
        password.classList.remove('valid')
        password.classList.add('invalid')
        if (passwordError.textContent == '') {
            passwordError.textContent = 'Password must have at least 8 characters'
        }
        else passwordError.textContent = passwordError.textContent.replace(' and', ',') + ' and at least 8 characters'
    }
}

password.addEventListener('blur', () => {
    if (validatePassword(password, passwordError)) {
        checkPassMatch()
    }  
})
password.addEventListener('focus', () => {
    password.classList.remove('valid', 'invalid')
    passwordError.textContent = ""
})

const confirmPassword = document.querySelector('#confirm-password')
const confirmpasswordError = confirmPassword.nextElementSibling

confirmPassword.addEventListener('blur', () => {
    if (validatePassword(confirmPassword, confirmpasswordError)) {
        checkPassMatch()
    }
   
})
confirmpasswordError.addEventListener('focus', () => {
    confirmPassword.classList.remove('valid', 'invalid')
    confirmPasswordError.textContent = ""
})

function checkPassMatch() {
    if (password.value && 
        confirmPassword.value)
    if (password.value !== confirmPassword.value) {
        confirmpasswordError.textContent = 'Your passwords doesn`t match'
        confirmPassword.classList.remove('valid')
        confirmPassword.classList.add('invalid')
        password.classList.remove('valid')
        password.classList.add('invalid')
    }
    else {
        confirmpasswordError.textContent = ''
        confirmPassword.classList.remove('invalid')
        confirmPassword.classList.add('valid')
        password.classList.remove('invalid')
        password.classList.add('valid')
    }
}