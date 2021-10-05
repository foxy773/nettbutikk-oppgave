
// Event listener

//document.getElementById("addToCartButton").addEventListener("click", function () {
//    addProductsToCart();
//});

// Product counter

// Test

cartStorage = window.sessionStorage;

const setUpCart = function (cartArray) {
    console.log(cartArray.products);
    const gridElem = document.querySelector(".product-grid-cart")
    const html = cartArray.map((product) => {
        return `
        <div class="product-card-cart">
                    <div class="product-cart-content">
                        <img src="${product[0].preview}" alt="">
                        <h3>${product[0].name}</h3>
                        <div class="product-count-container">
                            <a id="product-count-dec" option="dec">
                                <img src="./assets/minus.svg" alt="">
                            </a>
                            <input id="product-counter" type="tel" maxlength="3">
                            <a id="product-count-inc" option="inc">
                                <img src="./assets/add.svg" alt="">
                            </a>
                        </div>
                        <div class="product-price-counter-container">
                            <p>${product[0].price} kr</p>
                        </div>
                        <a class="product-cart-delete" href="">
                            <img src="./assets/cancel.svg" alt="">
                        </a>
                    </div>
                </div>
        `}).join("")
    gridElem.innerHTML = html
};


const getCart = function () {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart"));
    return jsonProducts;
};

const cart = {
    products: getCart() || [],
};


// Makes sure the product value cant be below 1
function productCountChecker() {
    console.log(productCounter.value)
    if (productCounter.value < 1) {
        productCounter.value = 1;
        console.log("Invalid Value")
    }
}

// End test
document.getElementById("empty-cart").addEventListener("click", function () {
    sessionStorage.clear()
    location.reload()
});

setUpCart(cart.products)

const productCounter = document.querySelector("#product-counter");
document.getElementById("product-count-dec").addEventListener("click", function () {
    productCounter.value--;
    productCountChecker();
});

document.getElementById("product-count-inc").addEventListener("click", function () {
    productCounter.value++;
    productCountChecker();
});

document.querySelector("#product-counter").addEventListener("change", function () {
    productCountChecker();
})

console.log(cart)