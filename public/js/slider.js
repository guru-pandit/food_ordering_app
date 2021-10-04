let sliderOne = document.getElementById("price-slider-1");
let sliderTwo = document.getElementById("price-slider-2");
let displayValOne = document.getElementById("price-range-1");
let displayValTwo = document.getElementById("price-range-2");
let minGap = 10;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap
    }
    displayValOne.innerHTML = "&#8377; " + sliderOne.value
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap
    }
    displayValTwo.innerHTML = "&#8377; " + sliderTwo.value
}