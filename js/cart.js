const cartTable = document.getElementById('cartBody')
const deleteAlert = document.querySelector('.delete-alert')
const deleteAccept = document.getElementById('deleteAccept')
const deleteReject = document.getElementById('deleteReject')
const totalElement = document.getElementById('total')
const loginAlert = document.querySelector('.login-alert')
const loginAccept = document.getElementById('loginAccept')
const loginReject = document.getElementById('loginReject')
let productInCart
if (localStorage.getItem('cart')) {
    productInCart = JSON.parse(localStorage.getItem('cart'))
    addToCartBody(productInCart)
} else {
    productInCart = []
    addToCartBody(productInCart)
}


if (!loggedStatus.status) {
    loginAlert.classList.add('show')
    productInCart=[]
    addToCartBody(productInCart)
}
loginAccept.addEventListener('click',_=>window.location.assign('login.html'))
loginReject.addEventListener('click',_=>window.location.assign('index.html'))

function addToCartBody(array) {
    let productRow = ''
    if (array.length) {
            array.forEach(element => {
        productRow += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3 flex-column flex-md-row">
                        <div class="table__img-prod">
                            <img src="${element.thumbnail}" alt="">
                        </div>
                        <div class="table__prod-name text-center">
                            <p>${element.title}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <h5>$${element.price}</h5>
                </td>
                <td>
                    <div class="table__prod-count d-flex justify-content-center">
                        <input type="text" maxlength="3" value="${element.count}">
                        <div class="d-flex flex-column">
                            <button class="quant-btn-plus" onclick="chaingeCount('increment',${element.id})">
                            ${element.count >= 100 ? '<i class="fa-solid fa-ban"></i>' : '<i class="fa fa-angle-up"></i>'}
                            </button>
                            <button class="quant-btn-minus" onclick="chaingeCount('decrement',${element.id})">
                            ${element.count <= 1 ? '<i class="fa-solid fa-trash"></i>' : '<i class="fa fa-angle-down"></i>'}
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <h5>$${element.price * element.count}</h5>
                </td>
            </tr>
        `
    });
    } else {
        productRow= `
        <tr>
            <td colspan="4">
                <h2>your cart is empty</h2>
            </td>
        </tr>
        `
    }

    cartTable.innerHTML = productRow
    getTotalPrice(array)
}

function chaingeCount(status, id) {
    let targetProduct = productInCart.find(e => e.id == id)
    if (status == 'increment') {
        if (!(targetProduct.count >= 100)) {
            targetProduct.count++
        }
    } else if (status == 'decrement') {
        if (targetProduct.count <= 1) {
            deleteAlert.classList.add('show')
            deleteAccept.addEventListener('click', _ => {
                productInCart = productInCart.filter(e => e.id != targetProduct.id)
                deleteAlert.classList.remove('show')
                localStorage.setItem('cart', JSON.stringify(productInCart))
                addToCartBody(productInCart)
            })
            deleteReject.addEventListener('click', _ => deleteAlert.classList.remove('show'))
        } else {
            targetProduct.count--
        }
    }
    localStorage.setItem('cart', JSON.stringify(productInCart))
    addToCartBody(productInCart)
}

function getTotalPrice(array){
    let total= 0
    array.forEach(e=>{
        total += e.price*e.count
    })
    totalElement.innerHTML='$'+total
}







// <tr>
// <td>
//     <div class="d-flex align-items-center gap-3 flex-column flex-md-row">
//         <div class="table__img-prod">
//             <img src="assets/image/cart.jpg" alt="">
//         </div>
//         <div class="table__prod-name text-center">
//             <p>Minimalistic shop for multipurpose use</p>
//         </div>
//     </div>
// </td>
// <td>
//     <h5>$360.00</h5>
// </td>
// <td>
//     <div class="table__prod-count d-flex justify-content-center">
//         <input type="text" maxlength="3" value="1">
//         <div class="d-flex flex-column">
//             <button class="quant-btn-plus"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
//             <button class="quant-btn-minus"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
//         </div>
//     </div>
// </td>
// <td>
//     <h5>$720.00</h5>
// </td>
// </tr>