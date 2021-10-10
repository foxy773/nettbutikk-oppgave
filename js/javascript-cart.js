
cartStorage = window.sessionStorage;

const setUpCart = function (cartArray) {
    const gridElem = document.querySelector(".product-grid-cart")
    const html = cartArray.map((product) => {
        console.log(product)
        return `
        <div class="product-card-cart">
                    <div class="product-cart-content">
                        <img src="${product[0].preview}" alt="">
                        <h3>${product[0].name}</h3>
                        <div class="product-count-container">
                            <a id="product-count-dec" option="dec">
                                <img src="./assets/minus.svg" alt="">
                            </a>
                            <input id="product-counter" type="tel" maxlength="3" value="${product[0].count}">
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

// getCart gets items from the sessionStorage(cartStorage) and filters them in an array before returning it to the cart.
const getCart = function () {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart"));
    const stringedCart = jsonProducts.map((cartItem)=> JSON.stringify(cartItem))
    const filteredCart = Array.from(new Set(stringedCart)).map((cartItem)=> {   // Filters all products to one and gives them a amount based on same products in stringedCart.
        const parsedItem = JSON.parse(cartItem);
        let count = 1;
        count = jsonProducts.filter((product) => product[0].id === parsedItem[0].id).length
        parsedItem[0].count = count;
        console.log(count)
        return parsedItem
    });

    console.log(filteredCart)
    return filteredCart;
};

// The array that hold all products that are currently in the cart.
const cart = {
    products: getCart() || [],  // Runs the function getCart if filteredCart is empty Cart will stay an empty array.
};


// Makes sure the product count cant be below 1
function productCountChecker(productCountValue) {
    console.log(productCountValue.value)
    if (productCountValue.value < 1) {
        productCountValue.value = 1;
        console.log("Invalid Value")
    }
}

// Empties the entire cart
document.getElementById("empty-cart").addEventListener("click", function () {
    sessionStorage.clear()
    location.reload()
});

// Defines AllCountContainer as all product-count-container classes and checks if they are clicked.
const setUpEventListenerTest = function() {
    const allCountContainer = document.querySelectorAll(".product-count-container")
    allCountContainer.forEach((container) => {
        const decCountEl = container.querySelector("#product-count-dec")
        const incCountEl = container.querySelector("#product-count-inc")
        const productCounter = container.querySelector("#product-counter");
        decCountEl.addEventListener("click", () =>{
            productCounter.value--;
            productCountChecker(productCounter);
        })
        incCountEl.addEventListener("click", () =>{
            productCounter.value++;
            productCountChecker(productCounter);    // Get all product count containers and runs the productCountChecker function that checks if they are under 1.
        })
        productCounter.addEventListener("change", () =>{
            productCountChecker(productCounter);    // --""--
        })
        console.log(decCountEl)
    })
    
}
setUpCart(cart.products)    // Gets the cart's products and send it to setUpCart Function.
setUpEventListenerTest()    // Runs the function that adds more products.