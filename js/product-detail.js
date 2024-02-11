const detailContainer = document.getElementById('detailContainer')
const loginAlert = document.querySelector('.login-alert')
const loginAccept = document.getElementById('loginAccept')
const loginReject = document.getElementById('loginReject')
const addCartCheck = document.querySelector('.add-cart-check')
let inputCount
let theProduct

loginAccept.addEventListener('click', _ => {
    window.location.assign('login.html')
})
loginReject.addEventListener('click', _ => {
    loginAlert.classList.remove('show')
})

let targetProduct = JSON.parse(localStorage.getItem('targetDetail'))

async function getProductDetail(id) {
    let url = 'https://dummyjson.com/products/' + id
    detailContainer.innerHTML = '<div class="loader"></div>'
    try {
        let requst = await fetch(url)
        let respns = await requst.json()
        theProduct = respns
        chackCart(theProduct)
    }
    catch {
        console.log('detail error');
    }
}
getProductDetail(targetProduct)



function addElementToHtml(obj) {
    detailContainer.innerHTML = `
    <div class="col-lg-6">
    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators product__carousel--img">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                class="active" aria-current="true" aria-label="Slide 1"></button>
            ${addProductImg(obj.images, 'btn')}
        </div>
        <div class="carousel-inner product__detail--img">
            <div class="carousel-item active">
                <img src="${obj.thumbnail}" alt="...">
            </div>
            ${addProductImg(obj.images, 'img')}
        </div>
    </div>
    </div>
    <div class="col-lg-5 ms-auto">
    <div class="product__info--details">
        <h2 class="product__info--name">${obj.title}</h2>
        <h2 class="product__info--price">$${obj.price} <span class="price-discount">${obj.price + obj.discountPercentage}</span></h2>
        <ul class="product__info--list">
            <li>
                <a href="#" class="active"><span>Category</span> :${obj.category}</a>
            </li>
            <li>
                <a href="#"><span>Brand</span> :${obj.brand}</a>
            </li>
        </ul>
        <p class="product__info--p">${obj.description}</p>
        <div class="product__info--count mb-4">
            <label for="count">Quantity:</label>
            <input type="number" name="count" id="count" min="0">
        </div>
        <div class="d-flex align-items-center">
            <button href="#" class="product__info--add-cart main-btn" onclick="addToCart()">add to cart</button>
            <a href="#" class="product__info--ico-btn"><i class="fa-regular fa-gem"></i></a>
            <a href="#" class="product__info--ico-btn"><i class="fa fa-heart"></i></a>
        </div>
    </div>
    </div>
    </div>
    
    `
    inputCount = document.getElementById('count')
}

function addProductImg(array, target) {
    if (target == 'btn') {
        array.pop()
        let a = ''
        array.forEach((_, i) => {
            a += `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i + 1}"
                aria-label="Slide ${i + 2}"></button>
            `
        });
        return a
    } else {
        let images = ''
        array.forEach(e => {
            images += `
            <div class="carousel-item">
                <img src="${e}" alt="...">
            </div>
            `
        })
        return images
    }
}

function addToCart() {
    if (loggedStatus.status) {
        let existing = false
        cart.forEach(e => {
            if (e.id == theProduct.id) {
                existing = theProduct
            }
        })
        if (existing) {
            cart.forEach(e => {
                if (e.id == existing.id) {
                    e.count = Number(inputCount.value) ? e.count + (Number(inputCount.value)) : ++e.count
                }
            })
        } else {
            theProduct.count=0
            theProduct.count = Number(inputCount.value) ? theProduct.count + (Number(inputCount.value)) : 1
            cart.push(theProduct)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        addCartCheck.classList.add('show')
        setTimeout(_ => addCartCheck.classList.remove('show'), 1000)
        inputCount.value = 1
    } else {
        loginAlert.classList.add('show')
    }
}

function chackCart(product) {
    if (loggedStatus.status && localStorage.getItem('cart')) {
        let cartItems = JSON.parse(localStorage.getItem("cart"))
        if (cartItems.length) {
            cartItems.forEach(e => {
                if (product.id == e.id) {
                    product.existingCart = true
                }
            })
        }
    }
    addElementToHtml(product)
}