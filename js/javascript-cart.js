// CartStorage is defines as sessionstorage
const cartStorage = window.sessionStorage;

// The array that hold all products that are currently in the cart.
const cart = {
    products: getCart() || [],  // Runs the function getCart if filteredCart is empty Cart will stay an empty array.
};
console.log("i am the cart", cart)
// Injects the HTML for the products in cart.html.
const setUpCart = function (cartArray) {
    const html = cartArray.map((product) => {
        // Creates HTML elements.
        const gridElem = document.querySelector(".product-grid-cart")
        const productCardCart = document.createElement("div")
        const productCartContent = document.createElement("div")
        const productPreview = document.createElement("img")
        const productName = document.createElement("h3")
        const productCountContainer = document.createElement("div")
        const productCountDec = document.createElement("a")
        const imageDec = document.createElement("img")
        const productCounter = document.createElement("input")
        const productCountInc = document.createElement("a")
        const imageAdd = document.createElement("img")
        const productPriceCounterContainer = document.createElement("div")
        const productPrice = document.createElement("p")
        const productId = document.createElement("a")
        const productCartDelete = document.createElement("div")
        const deleteButton = document.createElement("img")

        // Gives Elements classes.
        productCardCart.className = "product-card-cart"
        productCartContent.className = "product-cart-content"
        productCountContainer.className = "product-count-container"
        productPriceCounterContainer.className = "product-price-counter-container"
        productCartDelete.className = "product-cart-delete"
        deleteButton.className = "product-cart-delete"

        // Gives Elements Id´s.
        productCountDec.id = "product-count-dec"
        productCountDec.setAttribute("data-id", product.id)


        productCounter.id = "product-counter"
        productCountInc.id = "product-count-inc"
        productCountInc.setAttribute("data-id", product.id)


        //Gives elements properties.
        productPreview.src = product.preview
        productName.innerText = product.name
        productCountDec.option = "dec"
        imageDec.src = "./assets/minus.svg"
        productCounter.option = "inc"
        imageAdd.src = "./assets/add.svg"
        productPrice.innerText = `${product.price} kr`
        deleteButton.src = "./assets/cancel.svg"

        // Appends elements.
        gridElem.appendChild(productCardCart)
        productCardCart.appendChild(productCartContent)
        productCartContent.appendChild(productPreview)
        productCartContent.appendChild(productName)
        productCartContent.appendChild(productCountContainer)
        productCountContainer.appendChild(productCountDec)
        productCountDec.appendChild(imageDec)
        productCountContainer.appendChild(productCounter)
        productCountContainer.appendChild(productCountInc)
        productCountInc.appendChild(imageAdd)
        productCartContent.appendChild(productPriceCounterContainer)
        productPriceCounterContainer.appendChild(productPrice)
        productCartContent.appendChild(productId)
        productCartContent.appendChild(productCartDelete)
        productCartDelete.appendChild(deleteButton)
        
        // Gives value to 
        productCounter.value = product.count
        // productCardCart.setAttribute("data-id", product.id)
    });
}

// !!! NOT DONE. Calculates total price of all products to be displayed in the cart on index top right.
const calculateTotal = function(cartArray) {
    let totalPrice = {price: 0, saved: 0}
    cartArray.forEach((product) => {
        totalPrice.price += product.price * product.count
        totalPrice.saved += (product.fullPrice - product.price) * product.count
    })
    console.log(totalPrice)
    console.log(cartArray)
    return totalPrice
};
// Defines how many products you have in cart.
const setUpUi = function () {
    const products = getCart() || [];
    const cartInfoElem = document.querySelector("#cart-info");
    cartInfoElem.innerHTML = products.length;
    const cartPrice = document.querySelector("#cart-price");
    const sum = document.querySelector("#sum")
    const saved = document.querySelector("#saved")
    if (products.length > 0) {
        cartInfoElem.classList.remove("hidden");
    } else {
        cartInfoElem.classList.add("hidden");
    }
    const productPrices = calculateTotal(cart.products)
    console.log(productPrices)
    cartPrice.innerHTML = `${productPrices.price.toLocaleString()} kr`
    sum.innerHTML = `${productPrices.price.toLocaleString()} kr`
    saved.innerHTML = `${productPrices.saved.toLocaleString()} kr` // !!! NOT DONE
    
};

// getCart gets items from the sessionStorage(cartStorage) and filters them in an array before returning it to the cart.
function getCart() {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart"));
    const stringedCart = jsonProducts.map((cartItem)=> JSON.stringify(cartItem))
    const flattenProducts = jsonProducts.flat()

   // 
    const unique = {}
    const filteredCart = flattenProducts.filter((obj) => {
       return !unique[obj.id] && (unique[obj.id] = true)
    })
    console.log(filteredCart)
    return filteredCart;
};


// Makes sure the product count cant be below 1.
function productCountChecker(productCountValue) {
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
const setUpEventListener = function() {
    const allCountContainer = document.querySelectorAll(".product-count-container")
    allCountContainer.forEach((container) => {
        const decCountEl = container.querySelector("#product-count-dec")
        const incCountEl = container.querySelector("#product-count-inc")
        const productCounter = container.querySelector("#product-counter");
        const id = decCountEl.dataset.id 
        decCountEl.addEventListener("click", (event) =>{
            productCounter.value--;
            productCountChecker(productCounter);
            updateCart(id, productCounter)
        })
        incCountEl.addEventListener("click", (event) =>{
            productCounter.value++;
            productCountChecker(productCounter);    // Get all product count containers and runs the productCountChecker function that checks if they are under 1.
        })
        productCounter.addEventListener("change", () =>{
            productCountChecker(productCounter);    // --""--
        })
        console.log(decCountEl)
    })
    // !!!!
    allDeleteButtons = document.querySelectorAll(".product-cart-delete")
    allDeleteButtons.forEach((button) => {
        button.addEventListener("click", function (e){
            // const id = e.target.dataset.id
            // console.log("target", e.target)
            deleteCartItems(id)
            // console.log(id)
            //saveCart()
            //setUpUi()
        })
    })
    
}

function updateCart(id, productCounter) {
    const cart = getCart()
    console.log(cart)
    cart.forEach((product) => {
        if (product.id === id) {
            product.count = productCounter.value
        }
    })
    cartStorage.setItem("cart", JSON.stringify(cart))
    calculateTotal(cart)
    setUpUi()
}

/*  !!! This is going to itterate through the cart array and find the index of
    all the products that have the same id, and run a function that deletes all
    objects in the array that contains the same id with splice. !!! */
function deleteCartItems(id) {
    /*
        copy cart[]

        cart = filtrertCart
    
    */
    
    const findCartItems = cart.products.filter((product)=>{
        if (product.id === id) {
            
        }
    })
}

// Start up
setUpCart(cart.products)    // Gets the cart's products and send it to setUpCart Function.
setUpUi()
setUpEventListener()    // Runs the function that adds more products.
calculateTotal(cart.products)