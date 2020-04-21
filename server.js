const low = require ('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = low(adapter);

//app.use(express.static('public'));
const express = require ('express');
const app = express();
app.use(express.json())

//-------------------------------------------IMPORTING FUNCTIONS MODULE------------------------------------------- */
const func= require('./Modules/functions.js');

//-------------------------------------------INITIATE DATABASE------------------------------------------- */

initDatabase();
function initDatabase() {
    database.defaults({ Products: [], Cart: [] }).write();
}


//----------------END POINTS-------------------END POINTS--------------------END POINTS---------------- */


//--------------------------------------------POST: add a specific product ------------------------------------------- */
//http://localhost:5000/TechShop/add/?id=1
app.post('/TechShop/add', (req, res) => {
    const searchTerm = req.query.id;
    //console.log(req.url);
    //console.log(searchTerm);
    res.send('In add item to cart endpoint....');
    func.addItemInCart(searchTerm);
})

//-------------------------------------------DELETE: remove a specific product ------------------------------------------- */
//http://localhost:5000/TechShop/removeItem/?id=1
app.delete('/TechShop/removeItem', (req, res) => {
    const itemToDelete = req.query.id;
    //console.log(req.url);
    //console.log(itemToDelete);
    res.send('At item to delete from cart endpoint....');
    func.deleteItemFromCart(itemToDelete);
})

//-------------------------------------------DELETE: delete teh whole cart ------------------------------------------- */
//http://localhost:5000/TechShop/deleteAllCart
app.delete('/TechShop/deleteAllCart/', (req, res) => {
    let allCartItems = req.params.id;
    console.log('At Cart delete endpoint....');
//    allCartItems = parseInt(allCartItems);
    database.get('Cart').remove(allCartItems).write();
    res.send(allCartItems);
});


//------------------------------------------- GET: get all of the products ------------------------------------------- */
//http://localhost:5000/TechShop/getProducts
app.get('/TechShop/getproducts', (req, res) => {
    let allProducts = func.getProducts();
    res.send(JSON.stringify(allProducts));
    
    console.log('At get Products end point....');
});

//-------------------------------------------GET: get all Cart items ------------------------------------------- */
//http://localhost:5000/TechShop/getCartItems
app.get('/TechShop/getCartItems', (req, res) => {
    let allCartItems = func.getCartItems();
    res.send(JSON.stringify(allCartItems));
    
    console.log('At get Cart Items endpoint....');
});

app.listen(5000, () => {
    console.log('Server is running!');
});
