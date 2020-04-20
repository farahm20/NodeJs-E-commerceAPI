module.exports = ( server, database ) => 
{    
    function getProducts(){
        return database.get('Products').value();
    }
    function getCartItems(){
        return database.get('Cart').value();
    }

    function addItemInCart(searchTerm){
        let itemtoAdd = parseInt(searchTerm);
        //console.log(itemtoAdd);

    /* You should receive an error message if you try to add a product that does not exist.*/
        const matchProduct = database.get('Products').find({ id: itemtoAdd }).value();
        //console.log(matchProduct);
        if(matchProduct === undefined){
            alertMessage = {
                status : 'ERROR', message : "Invalid product ID. Enter correct ID. " };
                console.log(alertMessage);
        }else{
            alertMessage = {
                status : 'SUCCESS', message : "Valid ID. Item found in Products. "
            }
            console.log(alertMessage);

            /*You should not be able to add the same product to the shopping cart again.*/   
        
        const checkInCartItem = findItemInCart(itemtoAdd);//find item in cart
        
        if(checkInCartItem !== undefined){
            alertMessage = { 
                status : 'ERROR', message : "Item already present in Cart" };
                console.log(alertMessage);
        }else{
            database.get('Cart').push(matchProduct).write();
            
            alertMessage = {
                status : 'SUCCESS', message : "Item added in the Cart"};
                console.log(alertMessage);
            }
        }    
    }

    //You should receive an error message if you try to remove a product that does not exist. 

    function deleteItemFromCart(itemToDelete) {
        let removeItem= parseInt(itemToDelete);
        //console.log(removeItem);

        const checkInCartItem = findItemInCart(removeItem);//find item in cart
        //console.log(checkInCartItem);

        if(checkInCartItem !== undefined){
            database.get('Cart').remove(checkInCartItem).write();
            alertMessage = {
                status : 'SUCCESS', message : "Item removed from Cart" };
                console.log(alertMessage);
        }else{
            alertMessage = {
                status : 'ERROR', message : "Invalid request- Item not found in cart" };
            console.log(alertMessage);
        }    
    }

    function findItemInCart(itemToFind){
        const findInCart = database.get('Cart').find({ id: itemToFind}).value();
        //console.log(findInCart);
        return findInCart;
    }
}