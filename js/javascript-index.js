cartStorage = window.sessionStorage;

const saveCart = function () {
    const jsonProducts = JSON.stringify(cart.products)
    cartStorage.setItem("cart", jsonProducts)
}

const getCart = function () {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart"))
    return jsonProducts
}

const setUpUi = function () {
    const products = getCart() || []
    console.log(products)
    const cartInfoElem = document.querySelector("#cart-info")
    cartInfoElem.innerHTML = products.length;
    if (products.length > 0) {
        cartInfoElem.classList.remove("hidden")
    } else {
        cartInfoElem.classList.add("hidden")
    }
}

setUpUi()

// Products on main page

const products = [
    {
        name: "iPhone 13",
        price: 8990,
        fullPrice: 9790,
        new: true,
        preview: "./assets/iPhone-13-midnight4_m.png"
    },
    {
        name: "iPhone 13 PRO",
        price: 10990,
        fullPrice: 12970,
        new: true,
        preview: ""
    },

];

const cart = {
    products: getCart() || [],
    //totalPrice: this.products.price
};



const date = new Date()
console.log(date)

const testProducts = getCart()
console.log(testProducts)

function addProductsToCart() {
    cart.products.push(products[0]);
    console.log("Added to cart");
    console.log(cart);
    cart.totalPrice = 0;
    //console.log(cart.totalPrice);
    saveCart()
    console.log(getCart())
}

// Event listener

//document.getElementById("addToCartButton").addEventListener("click", function () {
//    addProductsToCart();
//});

// Product counter

document.getElementById("addToCartButton").addEventListener("click", function () {
    addProductsToCart()
    setUpUi()
})


document.getElementById("product-counter").addEventListener("change", function () {
    if (document.querySelector("product-counter").value < 0) {
        document.querySelector("product-counter").value = 0;
    }
})


console.log("hi")