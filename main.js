var rollPrice = 4; // declare global variable for rollPrice
// referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
    var removeItem = document.getElementsByClassName('delete-item') //set variable for the delete item selection
    console.log(removeItem.length)
    for (var i = 0; i < removeItem.length; i++) { //loop through all the delete options
        var deleteSelection = removeItem[i] // set variable for each delete button
        deleteSelection.addEventListener('click', function (event) { //listen for when any of the buttons are selected
            let selected = event.target 
            let item = selected.parentElement //get the parent div of the delete selection
            let itemPriceTotal = item.getElementsByClassName("cart-rolls")[0].innerText    
            adjustCost(item, itemPriceTotal) //adjust the cost accordingly
        })
    }
    updateTotalCost()
}
function adjustCost(item, cartItemTotal){
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
    let cartNumTotal = parseInt(localStorage.getItem ('cartNum')) //get the number of items in cart
    let cartNumAdjust = parseInt(cartItemTotal) //get the number of items that were removed 
    let newCartTotal = cartNumTotal - cartNumAdjust //get new total
    localStorage.setItem('cartNum', newCartTotal) //store the new cart total
    let price = item.getElementsByClassName('cart-price')[0].innerText //get the price
    let glaze = item.getElementsByClassName("cart-glaze")[0].innerText //get the glaze
    let cartCost = localStorage.getItem('totalCost') //get the total cost 
    let cartCurrCost = parseFloat(cartCost) //get the current cost
    let cartCostAdjust = parseFloat(price)*(cartItemTotal) //get the cost that needs to be subtracted
    newTotal = cartCurrCost - cartCostAdjust //get new total price
    localStorage.setItem("totalCost", newTotal) //set the new total price
    removeItem(glaze)
    displayCart()
    location.reload()
}
function onLoadCartNumbers() {
    // load cartNum on every page
    var itemTotalNumber = localStorage.getItem('cartNum')
    if (itemTotalNumber) {
        document.getElementById("cartNum").innerText = itemTotalNumber
    }
}
function updateGlazeImage() {
    var glazeOptions = document.getElementById("glaze-options"); // get all the glaze options
    var largeGlazeImage = document.getElementById("original-large"); //get the original roll image 
    var selectedGlazeOptionValue = glazeOptions.options[glazeOptions.selectedIndex].value; //get the selected galze 
    // set a variable for each glaze's image
    var noGlaze = "Assets/no-glaze.png";
    var vanillaGlaze = "Assets/vanilla-roll-large.png";
    var doubleChoco = "Assets/double-choco-large.png";
    var sugarMilk = "Assets/sugar-milk-large.png";
    // set the large iamge src depending on the selected glaze option
    if (selectedGlazeOptionValue == "none") { largeGlazeImage.src = noGlaze; }
    else if (selectedGlazeOptionValue == "vanilla") { largeGlazeImage.src = vanillaGlaze; }
    else if (selectedGlazeOptionValue == "chocolate") { largeGlazeImage.src = doubleChoco; }
    else if (selectedGlazeOptionValue = "sugar") { largeGlazeImage.src = sugarMilk; }
}
function updateRollPrice() {
    var getRollNumOptions = document.getElementById("numOfRolls"); //get the number of roll options 1,3,6,12
    var rollNumSelected = getRollNumOptions.options[getRollNumOptions.selectedIndex].text; //get the roll selected by the user
    var numOfRolls = parseInt(rollNumSelected) //convert num rolls options to int 
    // var getRollPrice = document.getElementById("originalRollPrice")    
    var getNumBoxes = document.getElementById("numOfBoxes") //get the number of boxes inputed by the user 
    var numOfBoxes = parseInt(getNumBoxes.value); //covert number of boxes to int 
    document.getElementById("originalRollPrice").textContent = rollPrice * numOfRolls * numOfBoxes //update the price by finding the product of the price, number of rolls, and number of boxes
}
function updateTotalCost(){
    
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
    let products = JSON.parse(localStorage.getItem('productsInCart')) //parse through productsInCart
    let items = Object.entries(products) //get the arrays in the cart
    let totalCost = 0;
    for (var i = 0; i < items.length; i++) { //loop through all the items 
        totalCost += (items[i][1].price) //add the price of the selected product to the toal cost 
    }
    console.log(document.getElementById("totalCostOfItems"))
    localStorage.setItem('totalCostOfItems', totalCost) //set cartCost in storage 
    document.getElementById("totalCostOfItems").innerText = totalCost //set totalCost to the updated total cost
}
function addOrderToCart() {
    var getRollNumOptions = document.getElementById("numOfRolls"); //get the number of roll options 1,3,6,12
    var rollNumSelected = getRollNumOptions.options[getRollNumOptions.selectedIndex].textContent; //get the roll selected by the user
    var numOfRolls = parseInt(rollNumSelected) //convert num rolls options to int 
    var cartNum = document.getElementById("cartNum").innerText; //get the current item number in the cart
    var cartInt = parseInt(cartNum) //convert the cart item number to int
    var getNumBoxes = document.getElementById("numOfBoxes"); //get the number of boxes inputed by the user 
    var numOfBoxes = parseInt(getNumBoxes.value); //covert number of boxes to int 
    document.getElementById("cartNum").textContent = cartInt + (numOfRolls * numOfBoxes)//update the cart by adding the product of the roll number and box number  
    var totalRolls = numOfRolls * numOfBoxes; // calcuate number of rolls 
    var cartNum = document.getElementById("cartNum").innerText; //get the current item number in the cart
    localStorage.setItem("cartNum", cartNum); //store the cart Num in local storage 
    var glazeOptions = document.getElementById("glaze-options"); // get all the glaze options
    var glazeSelection = glazeOptions.options[glazeOptions.selectedIndex].text; //get the selected galze 
    var itemPrice = document.getElementById("originalRollPrice").textContent; //get the item's price
    var price = parseInt(itemPrice); //get int of the price 
    var name = document.getElementById("Original-Heading").innerText; //get the name of the product 
    // let cartCost = localStorage.getItem('totalCost') //set cartCost in storage 
    itemsArray(name, glazeSelection, totalRolls, price, cartNum); //pass values into items Array as parameters 
    displayCart()
    updateTotalCost()
}
function itemsArray(name, glaze, rolls, price, cartNum) {
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) 
    product = { //create product object with properties: name, glaze, rolls, price and cartNums
        name,
        glaze,
        rolls,
        price,
        cartNum,
    }
    if (cartItems != null) {  
        if (cartItems[product.glaze] == undefined) { //if the glaze doesn't exist yet, create new array
            cartItems = {
                ...cartItems,
                [product.glaze]: product
            }
        }
        else {
            console.log(rolls)
            console.log(cartItems[product.glaze].rolls)
            cartItems[product.glaze].rolls += rolls	//adjust the number of rolls
            cartItems[product.glaze].price += price //adjust the price 
        }
    } 
    else {
        cartItems = {
            [product.glaze]: product
        }  
        // cartItems[product.glaze].rolls = rolls	//adjust the number of rolls
        // cartItems[product.glaze].price = price //adjust the price        	
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); //store the array
    updateTotalCost();
}
function displayCart() {
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || []; //prase through the items in cart
    let items = document.getElementById("products"); //get each item

    if (cartItems && items) { //html framework for adding each item into the cart
        items.innerHTML = '';
        Object.values(cartItems).map(item => {
            if (item.cartNum > 0) {
                var cartRowInfo = `
                <div class = "cartItems">
                  <h4 class = "cart-original-text">${item.name}</h4>
                  <h4 class = "cart-glaze">${item.glaze}</h4>
                  <h4 class = "cart-rolls">${item.rolls}</h4>
                  <h4 class = "cart-price">$${item.price}.00</h4>
                  <h4 class = "cart-edit">Edit</h4>
                  <h4 class="delete-item">Delete</h4>
                </div>`
                items.innerHTML += cartRowInfo //add row with the items information
            }
        })
    }
}
function removeItem(glaze) {
    console.log(glaze)
    let products = JSON.parse(localStorage.getItem('productsInCart')) //parse through productsInCart
    let items = Object.entries(products) //get the arrays in the cart
    for (var i = 0; i < items.length; i++) { //loop over the items array
        if (items[i][0] == glaze) { //check if the item is the corresponding glaze option
            console.log(items[i][0])
            items.splice(i, 1); //remove the corresponding item from the cart
            console.log(items)
            break; //exit the loop
        }
    }
    newItems = Object.fromEntries(items)
    localStorage.setItem("productsInCart", JSON.stringify(newItems)); //set item back into storage
}

displayCart()
onLoadCartNumbers()