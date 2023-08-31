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


// cart page

let btnPlus = document.querySelectorAll('.quant-btn-plus')
let btnMinus = document.querySelectorAll('.quant-btn-minus')


btnPlus.forEach(btn => {
    let quant = btn.parentElement.parentElement.children[0]
    btn.addEventListener('click' , _=>{
        quant.value < 99 ? ++quant.value : stop;
    })
});
btnMinus.forEach(btn => {
    let quant = btn.parentElement.parentElement.children[0]
    btn.addEventListener('click' , _=>{
        quant.value > 1 ? --quant.value : stop;
    })
});