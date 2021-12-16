// CartStorage is defines as sessionstorage
const cartStorage = window.sessionStorage;

// The array that hold all products that are currently in the cart.
const cart = {
    products: getCart() || [],  // Runs the function "getCart", if filteredCart is empty "cart" will stay an empty array.
};

// appends all elements from the cart array in cart.html.
const setUpCart = function (cartArray) {
    const gridElem = document.querySelector(".product-grid-cart").innerHTML = ""
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
        deleteButton.setAttribute("data-id", `${product.id}`)

        // Gives Elements classes.
        productCardCart.className = "product-card-cart"
        productCartContent.className = "product-cart-content"
        productCountContainer.className = "product-count-container"
        productPriceCounterContainer.className = "product-price-counter-container"
        productCartDelete.className = "product-cart-delete"
        deleteButton.className = "product-cart-delete-img"

        // Gives Elements Id´s.
        productCountDec.id = "product-count-dec"
        productCountDec.setAttribute("data-id", product.id)

        productCounter.id = "product-counter"
        productCountInc.id = "product-count-inc"
        productCountInc.setAttribute("data-id", product.id)
        deleteButton.setAttribute("id", product.id)

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
        
        // Gives value to the productCounters.
        productCounter.value = product.count
    });
}

// Calculates total price of all products to be displayed in the cart on index top right.
const calculateTotal = function(cartArray) {
    let totalPrice = {price: null, saved: null}
    cartArray.forEach((product) => {
        totalPrice.price += product.price * product.count
        totalPrice.saved += (product.fullPrice - product.price) * product.count
    })
    return totalPrice
};

// Defines how many products you have in cart.
const setUpUi = function () {
    const products = getCart() || [];
    const cartInfoElem = document.querySelector("#cart-info");
    cartInfoElem.innerHTML = products.reduce((acc, item) =>  Number(item.count) + Number(acc), 0)
    const cartPrice = document.querySelector("#cart-price");
    const sum = document.querySelector("#sum")
    const saved = document.querySelector("#saved")
    if (products.length > 0) {
        cartInfoElem.classList.remove("hidden");
    } else {
        cartInfoElem.classList.add("hidden");
    }
    const productPrices = calculateTotal(products)
    cartPrice.innerHTML = `${productPrices.price || 0} kr`

    sum.innerHTML = `${productPrices.price || 0} kr`
    saved.innerHTML = `${productPrices.saved || 0} kr`
    
};

// getCart gets items from the sessionStorage(cartStorage) and filters them in an array before returning it to the cart.
function getCart() {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart")) || []; 
    const flattenProducts = jsonProducts.flat()

    const unique = {}
    const filteredCart = flattenProducts.filter((obj) => {
       return !unique[obj.id] && (unique[obj.id] = true)
    })
    return filteredCart;
};


// Makes sure the product count cant be below 1.
function productCountChecker(productCountValue) {
    if (productCountValue.value < 1) {
        productCountValue.value = 1;
    }
}

// Empties the entire cart
document.getElementById("empty-cart").addEventListener("click", function () {
    sessionStorage.clear()
    setUpUi()
    setUpCart(cart.products)
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
            setUpUi() 
        })

        incCountEl.addEventListener("click", (event) =>{
            productCounter.value++;
            productCountChecker(productCounter); // Get all product count containers and runs the productCountChecker function that checks if they are under 1.
            updateCart(id, productCounter)
            setUpUi()   
        })

        productCounter.addEventListener("change", () =>{
            productCountChecker(productCounter);    // Get all product count containers and runs the productCountChecker function that checks if they are under 1.
        })
    })

    // Gets the specific cart product id and send it to "deleteCartItem" to be deleted.
    allDeleteButtons = document.querySelectorAll(".product-cart-delete-img")
    allDeleteButtons.forEach((button) => {
        button.addEventListener("click", function (e){
            const id = e.target.getAttribute("data-id")
            deleteCartItem(id)
            setUpEventListener()
        })
    })    
}

// Updates the cart if the value/number for a specific item/product in cart is changed.
function updateCart(id, productCounter) {
    const cart = getCart() 
    cart.forEach((product) => {
        if (product.id === id) {
            product.count = productCounter.value
        }
    })
    cartStorage.setItem("cart", JSON.stringify(cart))
    setUpUi()
}

// Deletes a cart item when the function is called upon with the product id that was provided.
function deleteCartItem(id) {
    const cart = getCart() 
    const newCart = cart.filter((product) => {
        return product.id !== id
    })

    cartStorage.setItem("cart", JSON.stringify(newCart))
    setUpCart(newCart)
    setUpUi()
    setUpEventListener()
    
}

// Start up
setUpCart(cart.products)    // Gets the cart's products and send it to setUpCart Function.
setUpUi()
setUpEventListener()
calculateTotal(cart.products)