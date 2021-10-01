
// Event listener

//document.getElementById("addToCartButton").addEventListener("click", function () {
//    addProductsToCart();
//});

// Product counter
const productCounter = document.querySelector("#product-counter")
document.getElementById("product-count-dec").addEventListener("click", function () {
    productCounter.value--;
    productCountChecker()
});

document.getElementById("product-count-inc").addEventListener("click", function () {
    productCounter.value++;
    productCountChecker()
});

document.querySelector("#product-counter").addEventListener("change", function () {
    productCountChecker()
})

// Makes sure the product value cant be below 1
function productCountChecker() {
    console.log(productCounter.value)
    if (productCounter.value < 1) {
        productCounter.value = 1;
        console.log("Invalid Value")
    }
}