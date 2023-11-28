




const loginBtnInHeader=document.getElementById('login-btn')

let cart
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
} else {
    cart = []
}


let loggedStatus=false;
let allUsers = []



if (localStorage.getItem('users')) {
    allUsers=JSON.parse(localStorage.getItem('users'))
}
if (localStorage.getItem('loggedStatus')) {
    loggedStatus = JSON.parse(localStorage.getItem('loggedStatus'))
}

if(loggedStatus.status){
    let targetUser = allUsers.find(e=>{return e.id==loggedStatus.id})
    loginBtnInHeader.innerHTML=`
                                <div>
                                    <img src="assets/image/userAvatar.jpg" alt="userAvatar">
                                    <div class="user-info">
                                    <span class="text-dark fw-bold">${targetUser.firstName} ${targetUser.lastName}</span>
                                    <span>${targetUser.email}</span>
                                    <button class="main-btn" onclick="logOut()">log out</button>
                                    </div>
                                </div>
    `
}





function logOut(){
    loggedStatus = false
    localStorage.setItem('loggedStatus',JSON.stringify(loggedStatus))
    window.location.replace('index.html')
}


































// cart page

// let btnPlus = document.querySelectorAll('.quant-btn-plus')
// let btnMinus = document.querySelectorAll('.quant-btn-minus')


// btnPlus.forEach(btn => {
//     let quant = btn.parentElement.parentElement.children[0]
//     btn.addEventListener('click' , _=>{
//        quant.value < 99 ? ++quant.value : stop;
//     })
// });
// btnMinus.forEach(btn => {
//     let quant = btn.parentElement.parentElement.children[0]
//     btn.addEventListener('click' , _=>{
//         quant.value > 1 ? --quant.value : stop;
//     })
// });