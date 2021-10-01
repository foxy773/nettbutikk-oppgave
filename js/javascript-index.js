// All products
const products = [
    {
        name: "iPhone 13",
        id: "1",
        price: 8990,
        fullPrice: 9790,
        new: true,
        preview: "./assets/iPhone-13-midnight4_m.png"
    },
    {
        name: "iPhone 13 PRO",
        id: "2",
        price: 10990,
        fullPrice: 12970,
        new: true,
        preview: "./assets/iPhone-13-Pro-sierra-blue4_m.png"
    },
    {
        name: `MacBook Pro 16" Stellargrå`,
        id: "3",
        price: 27490,
        fullPrice: 29990,
        new: false,
        preview: "./assets/mbp16touch-space-select-201911.jpg"
    },
    {
        name: `Playstation 5 Digital Edition`,
        id: "4",
        price: 4899,
        fullPrice: 4999,
        new: false,
        preview: "./assets/1077687_3_600x600_w_g.jpg"
    },
    {
        name: `iPad PRO Spacegray`,
        id: "5",
        price: 12190,
        fullPrice: 12490,
        new: false,
        preview: "./assets/ipad-pro-12-select-cell-spacegray-202104.jpg"
    },
    {
        name: `Apple Watch SE - Aluminium Solo Loop`,
        id: "6",
        price: 3290,
        fullPrice: 3390,
        new: false,
        preview: "./assets/MKVJ3ref_VW_34FR+watch-40-alum-gold-nc-se_VW_34FR_WF_CO.jpg"
    }

];
// cartStorage is sessionStorage
cartStorage = window.sessionStorage;

const setUpEventListeners = function () {
    const allBuyButtons = document.querySelectorAll("#addToCartButton")
    allBuyButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const id = e.target.dataset.id
            addProductsToCart(id)
            saveCart()
            setUpUi()
            console.log(e)
            console.log(id)
        })
    });
}

document.querySelector("#search").addEventListener("input", function (e) {
    searchForProducts(e.target.value)
});
const searchForProducts = function (value) {
    const filterProducts = products.filter((product) => {
        return product.name.includes(value);
    })
    setUpProducts(filterProducts)
    console.log(value, filterProducts)
}

const setUpProducts = function (productArray) {
    const gridElem = document.querySelector(".product-grid")
    const html = productArray.map((product) => `
    <div class="product-card">
                <div class="product-content">
                    <div class="product-content-badge">
                    ${product.new ? `<span>NYHET</span>` : `<span class="hidden">NYHET</span>`}
                    </div >
                    <div>
                        <h2>${product.name}</h2>
                    </div>
                    <div class="product-content-img">
                        <img src="${product.preview}" alt="">
                    </div>
                    <div class="product-info">
                        <h3>${product.price},-</h3>
                        <p>Fullpris <span>${product.fullPrice},-</span></p>
                    </div>
                    <a data-id="${product.id}" id="addToCartButton">
                        Legg i handlekurv
                        <img src="./assets/shopping-cart.svg" alt="">
                    </a>
                </div >
            </div >
    `).join("")
    gridElem.innerHTML = html
    setUpEventListeners()
};

const saveCart = function () {
    const jsonProducts = JSON.stringify(cart.products);
    cartStorage.setItem("cart", jsonProducts);
};

const getCart = function () {
    const jsonProducts = JSON.parse(cartStorage.getItem("cart"));
    return jsonProducts;
};

const setUpUi = function () {
    const products = getCart() || [];
    console.log(products);
    const cartInfoElem = document.querySelector("#cart-info");
    cartInfoElem.innerHTML = products.length;
    if (products.length > 0) {
        cartInfoElem.classList.remove("hidden");
    } else {
        cartInfoElem.classList.add("hidden");
    }
}

// Start up
setUpUi()
setUpProducts(products)



const cart = {
    products: getCart() || [],
    //totalPrice: this.products.price
};



const date = new Date()
console.log(date)

const testProducts = getCart()
console.log(testProducts)

function addProductsToCart(id) {
    const filterProduct = products.filter((product) => {
        return product.id === id
    })
    cart.products.push(filterProduct)
}

// Event listener


// Product counter



// document.querySelectorAll("#addToCartButton").addEventListener("click", function () {

// })


document.getElementById("product-counter").addEventListener("change", function () {
    if (document.querySelector("product-counter").value < 0) {
        document.querySelector("product-counter").value = 0;
    }
})


console.log("hi")