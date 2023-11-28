// start register selectors
const firstName = document.getElementById('first-name')
const lasttName = document.getElementById('last-name')
const email = document.getElementById('Email')
const password = document.getElementById('reg-Password')
const confirmPassword = document.getElementById('confirm-password')
const createAccountBtn = document.getElementById('create-account-btn')
const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


createAccountBtn.addEventListener('click', e => {
    e.preventDefault()
    if (firstName.value.length < 3) {
        firstName.classList.add('not-valid')
    } else {
        firstName.classList.remove('not-valid')
    }
    if (lasttName.value.length < 3) {
        lasttName.classList.add('not-valid')
    } else {
        lasttName.classList.remove('not-valid')
    }
    if (!regEmail.test(email.value)) {
        email.classList.add('not-valid')
    } else {
        email.classList.remove('not-valid')
    }
    if (password.value.length < 8) {
        password.classList.add('not-valid')
    } else {
        password.classList.remove('not-valid')
    }
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('not-valid')
    } else {
        confirmPassword.classList.remove('not-valid')
    }
    if (firstName.value.length > 2 && lasttName.value.length > 2 && regEmail.test(email.value) && password.value.length > 7 && confirmPassword.value == password.value) {
        let newUser = {
            id: Date.now(),
            firstName: firstName.value,
            lastName: lasttName.value,
            email: email.value,
            password: password.value
        }
        allUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(allUsers))
        firstName.value = ''
        lasttName.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        loggedStatus={
            status:true,
            id:newUser.id
        }
        localStorage.setItem('loggedStatus',JSON.stringify(loggedStatus))
        window.location.replace('index.html')
    }
})