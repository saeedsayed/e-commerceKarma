// log in selectors
const userName = document.getElementById("user-name");
const logPassword = document.getElementById("log-Password");
const loginBtn = document.getElementById("login-submit");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (userName.value.length < 3) {
        userName.classList.add("not-valid");
    } else {
        userName.classList.remove("not-valid");
    }
    if (logPassword.value.length < 8) {
        logPassword.classList.add("not-valid");
    } else {
        logPassword.classList.remove("not-valid");
    }
    if (userName.value.length > 2 && logPassword.value.length > 7) {
        if (allUsers.length) {
            let targetUser = allUsers.find(user => user.firstName == userName.value && user.password == logPassword.value)
            if (targetUser) {
                loggedStatus = {
                    status: true,
                    id: targetUser.id
                }
                localStorage.setItem('loggedStatus', JSON.stringify(loggedStatus))
                window.location.replace('index.html')
            } else {
                document.querySelector('.incorrect').classList.replace('d-none', 'd-block')
            };
        } else {
            document.querySelector('.incorrect').classList.replace('d-none', 'd-block')
        }
    }
});
