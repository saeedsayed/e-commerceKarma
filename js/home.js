const productRow = document.getElementById('productsRow')
const loginAlert = document.querySelector('.login-alert')
const loginAccept = document.getElementById('loginAccept')
const loginReject = document.getElementById('loginReject')
const addCartCheck = document.querySelector('.add-cart-check')
let products

loginAccept.addEventListener('click', _ => {
    window.location.assign('login.html')
})
loginReject.addEventListener('click', _ => {
    loginAlert.classList.remove('show')
})

getProduct()
async function getProduct() {
    let url = `https://dummyjson.com/products?limit=8`
    productRow.innerHTML = '<div class="loader"></div>'
    try {
        let requst = await fetch(url)
        let respns = await requst.json()
        products = respns.products
        chackCart(products)
    }
    catch (error) {
        console.log('error', error);
    }
}



function chackCart(array) {
    if (loggedStatus.status && localStorage.getItem('cart')) {
        let cartItems = JSON.parse(localStorage.getItem("cart"))
        if (cartItems.length) {
            array.forEach(e => {
                cartItems.forEach(a => {
                    if (e.id == a.id) {
                        e.existingCart = true
                    }
                })
            })
        }
    }
    addProductInHtml(array)
}

function addProductInHtml(array) {
    let products = ''
    array.forEach(product => {
        products += `
        <div class="col-lg-3 col-md-6">
        <div class="single__product mt-4">
            <img src="${product.thumbnail}" alt="product img" loding="lazy">
            <div class="product__details">
                <h5 class="product__title">${product.title.length > 24 ? product.title.slice(0, 22).padEnd(25, '.') : product.title}</h5>
                <div class="product__price d-flex">
                    <h6>$ ${product.price}</h6>
                    <p class="text-decoration-line-through">$ ${product.price + product.discountPercentage}</p>
                </div>
                <div class="product__options d-flex">
                    <button class="product__option d-flex"  onclick="addToCart(${product.id},this)">
                        <div class="product__option--icon">${product.existingCart ? '<i class="fa-solid fa-circle-plus"></i>' : '<i class="fa-solid fa-cart-plus"></i>'}
                        </div>
                        <p class="product__option--text">${product.existingCart ? "add One More" : "Add To Cart"}</p>
                    </button>
                    <button class="product__option d-flex">
                        <div class="product__option--icon"><i class="fa-regular fa-heart"></i></div>
                        <p class="product__option--text">wishlist</p>
                    </button>
                    <button class="product__option d-flex" onclick="goToDetail(${product.id})">
                        <div class="product__option--icon"><i
                                class="fa-solid fa-up-down-left-right"></i></div>
                        <p class="product__option--text">view more</p>
                    </button>
                </div>
            </div>
        </div>
        </div>
        `
    });
    productRow.innerHTML = products
}

function addToCart(id, btn) {
    if (loggedStatus.status) {
        let targetProduct = products.find(e => e.id == id)
        let chack = false
        cart.forEach(e => {
            if (e.id == targetProduct.id) {
                chack = targetProduct
            }
        })
        if (chack) {
            cart.forEach(e => {
                if (e.id == chack.id) {
                    e.count++
                }
            })
        } else {
            targetProduct.count = 1
            cart.push(targetProduct)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        btn.querySelector('.product__option--text').textContent = 'add one more'
        btn.querySelector('.product__option--icon').innerHTML = '<i class="fa-solid fa-circle-plus"></i>'
        addCartCheck.classList.add('show')
        setTimeout(_ => addCartCheck.classList.remove('show'), 1000)
    } else {
        loginAlert.classList.add('show')
    }
}



function goToDetail(id) {
    localStorage.setItem('targetDetail', JSON.stringify(id))
    window.location.assign('product-detail.html')
}


// The data/time we want to countdown to
let countDownDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 30);


// Run myFunc every second

let myFunc = setInterval(function () {

    let timeNow = new Date().getTime();
    let timeLeft = countDownDate - timeNow;

    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    document.getElementById("days").innerHTML = days
    document.getElementById("hours").innerHTML = hours
    document.getElementById("mins").innerHTML = minutes
    document.getElementById("secs").innerHTML = seconds
    // Display the message when countdown is over
    if (timeLeft < 0) {
        clearInterval(myFunc);
        document.getElementById("days").innerHTML = "0"
        document.getElementById("hours").innerHTML = "0"
        document.getElementById("mins").innerHTML = "0"
        document.getElementById("secs").innerHTML = "0"
    }
}, 1000);








