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
        price: 10970,
        fullPrice: 12970,
        new: true,
        preview: ""
    },

]

const cart = {
    products: [

    ]
};

function addProductsToCart(){
    cart.products.push(products[0])
    console.log("Added to cart");
}

document.getElementById("addToCartButton").addEventListener("click", function(){
    addProductsToCart();
});

console.log(cart);