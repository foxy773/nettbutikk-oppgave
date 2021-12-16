// All products.
const products = [
    {
        name: `iPhone 13`,  // Name of product.
        id: "1",            // Id of product.
        price: 8990,        // Current price of product.
        fullPrice: 9790,    // Old price.
        new: true,          // Displays a NYHET span.
        preview: "./assets/iPhone-13-midnight4_m.png",   // Image of product.
        count: 0            // Amount of products (Will be used when in cart).
    },

    {
        name: `iPhone 13 PRO`,
        id: "2",
        price: 10990,
        fullPrice: 12970,
        new: true,
        preview: "./assets/iPhone-13-Pro-sierra-blue4_m.png",
        count: 0
    },

    {
        name: `MacBook Pro 16" Stellargrå`,
        id: "3",
        price: 27490,
        fullPrice: 29990,
        new: false,
        preview: "./assets/mbp16touch-space-select-201911.jpg",
        count: 0
    },

    {
        name: `Playstation 5 Digital Edition`,
        id: "4",
        price: 4899,
        fullPrice: 4999,
        new: false,
        preview: "./assets/1077687_3_600x600_w_g.jpg",
        count: 0 
    },

    {
        name: `iPad PRO (2020) 11" Spacegray`,
        id: "5",
        price: 12190,
        fullPrice: 12490,
        new: false,
        preview: "./assets/ipad-pro-12-select-cell-spacegray-202104.jpg",
        count: 0 
    },

    {
        name: `Apple Watch SE - Aluminium Solo Loop`,
        id: "6",
        price: 3290,
        fullPrice: 3390,
        new: false,
        preview: "./assets/MKVJ3ref_VW_34FR+watch-40-alum-gold-nc-se_VW_34FR_WF_CO.jpg",
        count: 0
    },

    {
        name: `Xbox Series S Bundle`,
        id: "7",
        price: 3799,
        fullPrice: 3948,
        new: false,
        preview: "./assets/2bbae9c6-b091-49f2-96b3-a8f0fa65eb86.png",
        count: 0
    },

    {
        name: `Steam Deck 512GB NVMe SSD`,
        id: "8",
        price: 6499,
        fullPrice: 6999,
        new: true,
        preview: "./assets/iXEae55745C4K3ucTGGjBF.jpg",
        count: 0
    },

    {
        name: `iPad mini (2021) 8.3" 64GB Stellargrå`,
        id: "9",
        price: 7790,
        fullPrice: 7890,
        new: true,
        preview: "./assets/1196159.png",
        count: 0
    },

    {
        name: `GoPro HERO10 Black`,
        id: "10",
        price: 5799,
        fullPrice: 5999,
        new: true,
        preview: "./assets/1192766.png",
        count: 0 
    },

    {
        name: `Apple Airpods PRO`,
        id: "11",
        price: 2999,
        fullPrice: 3299,
        new: false,
        preview: "./assets/1037413_10_600x600_w_g.jpg",
        count: 0
    },

    {
        name: `Oculus Quest 2`,
        id: "12",
        price: 3849,
        fullPrice: 3999,
        new: false,
        preview: "./assets/188217273_375087057231358_2364163511002099082_n.jpeg",
        count: 0
    }
];

// cartStorage is sessionStorage.
cartStorage = window.sessionStorage;

/* Adds eventlistners for each button with the id "addToCartButton"
and calls upon 3 functions that sets up the UI, saves items from the
cart array to session storrage, and add products to cart with the 
same id as the buttons.*/
const setUpEventListeners = function () {
    const allBuyButtons = document.querySelectorAll("#addToCartButton")
    allBuyButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const id = e.target.dataset.id
            addProductsToCart(id)
            saveCart()
            setUpUi()
        })
    });
}

// Eventlistener for the search box and runs the searchForProducts() function.
const search = document.querySelector("#search").addEventListener("input", function (e) {
    const gridElem = document.querySelector(".product-grid")
    gridElem.innerHTML = ""
        searchForProducts(e.target.value)
});

// Filters through all products and returns all products that includes searched for name.
const searchForProducts = function (value) {
    const filterProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
    })
    setUpProducts(filterProducts)
}

// Sets up all products by itterating though the products array and injects them in the product-grid class.
const setUpProducts = function (productArray) {
    const html = productArray.map((product) => {

        // Creates HTML elements.
        const gridElem = document.querySelector(".product-grid")
        const productCard = document.createElement("div")
        const productContent = document.createElement("div")
        const productContentBadge = document.createElement("div")
        const productContentBadgeSpan = document.createElement("span")
        const productNameContainer = document.createElement("div")
        const productName = document.createElement("h2")
        const productContentImage = document.createElement("div")
        const productPreview = document.createElement("img")
        const productInfo = document.createElement("div")
        const price = document.createElement("h3")
        const fullPrice = document.createElement("p")
        const fullPriceSpan = document.createElement("span")
        const addToCartButton = document.createElement("a")
        const shoppingCartImage = document.createElement("img")

        // Gives elements classes.
        productCard.className = "product-card"
        productContent.className = "product-content"
        productContentBadge.className = "product-content-badge"
        productContentImage.className = "product-content-img"
        productInfo.className = "product-info"

        // Gives elements id´s.
        addToCartButton.id = "addToCartButton"

        // Gives elements properties.
        productContentBadgeSpan.innerText = "NYHET"
        productPreview.src = product.preview
        productName.innerText = product.name
        price.innerText = `${product.price},-`
        fullPrice.innerText = "Fullpris "
        fullPriceSpan.innerText = `${product.fullPrice},-`
        addToCartButton.innerText = "Legg i handlekurv"
        shoppingCartImage.src = "./assets/shopping-cart.svg"

        // Appends elements.
        gridElem.appendChild(productCard)
        productCard.appendChild(productContent)
        productContent.appendChild(productContentBadge)
        productContentBadge.appendChild(productContentBadgeSpan)
        productContent.appendChild(productNameContainer)
        productNameContainer.appendChild(productName)
        productContent.appendChild(productContentImage)
        productContentImage.appendChild(productPreview)
        productContent.appendChild(productInfo)
        productInfo.appendChild(price)
        productInfo.appendChild(fullPrice)
        fullPrice.appendChild(fullPriceSpan)
        productContent.appendChild(addToCartButton)
        addToCartButton.appendChild(shoppingCartImage)

        // add dataid to html.
        addToCartButton.setAttribute("data-id", product.id)
    })
    setUpEventListeners()
};

// Calculates total price of all products to be displayed in the cart on index top right.
const calculateTotal = function(cartArray) {
    let sum = 0;
    const productPrice = cartArray.forEach((product)=>{
    });
    return sum
};

// Saves the cart in sessionStorage.
const saveCart = function () {
    const jsonProducts = JSON.stringify(cart.products);
    cartStorage.setItem("cart", jsonProducts);
};

// Gets cart from sessionStorage.
const getCart = function () {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart")) || []
    const flattenProducts = jsonProducts.flat()

    const unique = {}
    const filteredCart = flattenProducts.filter((obj) => {
       return !unique[obj.id] && (unique[obj.id] = true)
    })
    return filteredCart;
};

// Sets up much of the information in the UI.
const setUpUi = function () {
    const products = getCart() || [];
    const cartInfoElem = document.querySelector("#cart-info");
    const cartCount = products.reduce((acc, item) =>  Number(item.count) + Number(acc), 0 )
    const cartPrice = products.reduce((acc, item) =>  item.price * item.count + acc, 0)
    cartInfoElem.innerHTML =  `${cartCount}`

    const cartPriceEl = document.querySelector("#cart-price");
    cartPriceEl.innerHTML = `${cartPrice}kr`

    if (products.length > 0) {
        cartInfoElem.classList.remove("hidden");
    } else {
        cartInfoElem.classList.add("hidden");
    }
    cartPrice.innerHTML = `${calculateTotal(products).toLocaleString()}.00 kr` // !!! NOT DONE
}

// Holds all products that is added to cart.
const cart = {
    products: getCart() || [],
};

function addProductsToCart(id) {
    const filterProduct = products.filter((product) => {
        if(product.id === id ){
        product.count ++
        }
        return product.id === id
    })
    cart.products.push(filterProduct)
}

// Start up
setUpProducts(products)
setUpUi()