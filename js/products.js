const productContainer = document.getElementById('productContainer')
const categoryUl = document.querySelector('.main__category')
const nextPaginationBtn = document.querySelectorAll('.nextBtn')
const prevPaginationBtn = document.querySelectorAll('.prevBtn')
const paginationNumberBtn = document.querySelectorAll('.pagination-num')
const loginAlert = document.querySelector('.login-alert')
const loginAccept = document.getElementById('loginAccept')
const loginReject = document.getElementById('loginReject')
const addCartCheck = document.querySelector('.add-cart-check')

let productLimit = 6
let pageNumber = 0
let productCount
let pageCount
let products

nextPaginationBtn.forEach(e => {
    e.addEventListener('click', _ => {
        if (pageNumber + 1 >= pageCount) {
            e.classList.add('disabled')
        } else {
            pageNumber++
            getProduct()
        }
        cahingePaginationValue()
        chaingefocusPagination()
    })
})


prevPaginationBtn.forEach(e => {
    e.addEventListener('click', _ => {
        if (pageNumber == 0) {
            e.classList.add('disabled')
        } else {
            pageNumber--
            getProduct()
        }
        cahingePaginationValue()
        chaingefocusPagination()
    })
})

paginationNumberBtn.forEach(e => {
    e.addEventListener('click', _ => {
        pageNumber = +e.textContent - 1
        getProduct()
        cahingePaginationValue()
        chaingefocusPagination()
    })
})

loginAccept.addEventListener('click',_=>{
    window.location.assign('login.html')
})
loginReject.addEventListener('click',_=>{
    loginAlert.classList.remove('show')
})

async function getProduct() {
    let url = `https://dummyjson.com/products?limit=${productLimit}&skip=${pageNumber * productLimit}`
    productContainer.innerHTML = '<div class="loader"></div>'
    try {
        let requst = await fetch(url)
        let respns = await requst.json()
        products = respns.products
        chackCart(products)

        // addProductInHtml(products)
        productCount = respns.total
        pageCount = Math.ceil(productCount / productLimit)

        // addCategory(respns.products)
    }
    catch (error) {
        console.log('error', error);
    }
    document.querySelectorAll('.slider__category--item').forEach(item => {
        item.classList.remove('active')
    })
    document.querySelectorAll('.pagination').forEach(e => {
        e.classList.remove('d-none');
    })
}

getProduct()
async function getCategory() {
    let url = 'https://dummyjson.com/products/categories'
    categoryUl.innerHTML = '<div class="loader"></div>'
    try {
        let requst = await fetch(url)
        let respns = await requst.json()
        addCategory(respns)
    }
    catch {
        console.log('category error');
    }
}
getCategory()

async function getProductByCategory(category, li) {
    let url = `https://dummyjson.com/products/category/${category}`
    productContainer.innerHTML = '<div class="loader"></div>'
    try {
        let requst = await fetch(url)
        let respns = await requst.json()
        products=respns.products
        chackCart(products)
        if (respns.products.length < productLimit) {
            document.querySelectorAll('.pagination').forEach(e => {
                e.classList.add('d-none');
            })
        } else {
            document.querySelectorAll('.pagination').forEach(e => {
                e.classList.remove('d-none');
            })
        }
    }
    catch (error){
        console.log('product by category error' , error);
    }
    document.querySelectorAll('.slider__category--item').forEach(item => {
        item.classList.remove('active')
    })
    li.classList.add('active')

}



function addProductInHtml(array1) {
    let products = ''
    array1.forEach(product => {
        products += `
        
<div class="col-lg-4 col-md-6">
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
    productContainer.innerHTML = products

}



function addCategory(array) {
    let categorys = `<li class="slider__category--item" onclick="getProduct()">All</li>`
    array.forEach(category => {
        categorys += `<li class="slider__category--item" onclick="getProductByCategory('${category}',this)">${category}</li>`
    })
    categoryUl.innerHTML = categorys
}

function cahingePaginationValue() {
    if (pageNumber >= +paginationNumberBtn[paginationNumberBtn.length - 1].textContent - 1 && !(+paginationNumberBtn[paginationNumberBtn.length - 1].textContent >= pageCount)) {
        paginationNumberBtn.forEach(e => {
            e.innerHTML = +e.textContent + productLimit - 3
        })
    } else if (pageNumber <= +paginationNumberBtn[0].textContent - 1 && !(paginationNumberBtn[0].textContent <= 1)) {
        paginationNumberBtn.forEach(e => {
            e.innerHTML = (+e.textContent) - (productLimit - 3)
        })
    }
}

function chaingefocusPagination() {
    paginationNumberBtn.forEach(btn => {
        btn.classList.remove('active')
        if (btn.textContent == pageNumber + 1) {
            btn.classList.add('active')
        }
    })
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

function goToDetail(id) {
    localStorage.setItem('targetDetail', JSON.stringify(id))
    window.location.assign('product-detail.html')
}