
const low = require ('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = low(adapter);

//app.use(express.static('public'));
const express = require ('express');
const app = express();
app.use(express.json())
const functions = require('./Modules/functions.js');

initDatabase();
function initDatabase() {
    database.defaults({ Products: [], Cart: [] }).write();
}

functions(server, database);

//**********************END POINTS */
//Be able to add products to a shopping cart.
//http://localhost:5000/TechShop/add/?id=1
app.post('/TechShop/add', (req, res) => {
    const searchTerm = req.query.id;
    //console.log(req.url);
    //console.log(searchTerm);
    res.send('In add item to cart endpoint');
    addItemInCart(searchTerm);
})

//http://localhost:5000/TechShop/removeItem/?id=1
app.delete('/TechShop/removeItem', (req, res) => {
    const itemToDelete = req.query.id;
    //console.log(req.url);
    //console.log(itemToDelete);
    res.send('At item to delete from cart endpoint');
    deleteItemFromCart(itemToDelete);
})


//http://localhost:5000/TechShop/deleteAllCart
//Be able to remove products in the shopping cart.
app.delete('/TechShop/deleteAllCart/', (req, res) => {
    let allCartItems = req.params.id;
    console.log('Cart deleted succesfully...');
//    allCartItems = parseInt(allCartItems);
    database.get('Cart').remove(allCartItems).write();
    res.send(allCartItems);
});


//Download all products (then below on what a product should contain)
//http://localhost:5000/TechShop/getProducts
app.get('/TechShop/getproducts', (req, res) => {
    let allProducts = getProducts();
    res.send(JSON.stringify(allProducts));
    
    console.log('Requests recieved to get all products..');
});

//Download the shopping cart with all the added products.
//http://localhost:5000/TechShop/getCartItems
app.get('/TechShop/getCartItems', (req, res) => {
    let allCartItems = getCartItems();
    res.send(JSON.stringify(allCartItems));
    
    console.log('Requests recieved to get all cart items..');
});

app.listen(5000, () => {
    console.log('Server is running!');
});
