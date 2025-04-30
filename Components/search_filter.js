const products = [
    { id: 1, name: "T-shirt", category: "Clothing", price: 500, size: ["S", "M", "L", "XL"], rating: 4.5 },
    { id: 2, name: "Jeans", category: "Clothing", price: 1200, size: ["28", "30", "32", "34"], rating: 4.0 },
    { id: 3, name: "Handbag", category: "Accessories", price: 800, size: ["Standard"], rating: 5.0 },
    { id: 4, name: "Sneakers", category: "Footwear", price: 2500, size: ["6", "7", "8", "9", "10"], rating: 4.3 },
    { id: 5, name: "Wristwatch", category: "Accessories", price: 3000, size: ["Standard"], rating: 4.8 },
    { id: 6, name: "Jacket", category: "Clothing", price: 2000, size: ["M", "L", "XL", "XXL"], rating: 4.2 },
    { id: 7, name: "Backpack", category: "Accessories", price: 1500, size: ["Standard"], rating: 4.6 },
    { id: 8, name: "Formal Shoes", category: "Footwear", price: 3500, size: ["7", "8", "9", "10", "11"], rating: 4.4 },
    { id: 9, name: "Cap", category: "Accessories", price: 400, size: ["Standard"], rating: 4.0 },
    { id: 10, name: "Dress", category: "Clothing", price: 1800, size: ["S", "M", "L", "XL"], rating: 4.7 },
    { id: 11, name: "Sandals", category: "Footwear", price: 1200, size: ["6", "7", "8", "9"], rating: 4.1 },
    { id: 12, name: "Sunglasses", category: "Accessories", price: 1000, size: ["Standard"], rating: 4.5 },
];


// Search filter

function search(...userSearchInput) {
    const userSearch = userSearchInput.map(input => input.toLowerCase());

    
    const filtered_category = 
        products.filter(products => userSearch.includes(products.category.toLowerCase()));
    console.log(filtered_category);

    const filtered_name = 
        products.filter(products => userSearch.includes(products.name.toLowerCase()));
    console.log(filtered_name);

    //  const filtered_price = 
    //     products.filter(products => userSearch.includes(products.price));
    // console.log(filtered_price);

    //  const filtered_size = 
    //     products.filter(products => userSearch.includes(products.size.includes(userSearch)));
    // console.log(filtered_size);
}



















//before using the function below you have to create html buttons for filter 
// Then you have to pass the inner html of those buttons to the user input of this function
// and that's how you are going to filter items
function filteration(...userInput) {
    const user_selected = userInput.map(input => input.toLowerCase());

    const filtered_items = products.filter(products =>
        user_selected.includes(products.category.toLowerCase())
    );

    return filtered_items;
}

// console.log(filteration("Clothing", "Accessories"));
