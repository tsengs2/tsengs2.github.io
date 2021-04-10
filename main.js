var rollPrice = 4; // declare global variable for rollPrice

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    var removeCartItem = document.getElementsByClassName('delete-item')
    console.log(removeCartItem.length)

    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i]
        button.addEventListener('click', function (event) {
            let buttonClicked = event.target
            let item = buttonClicked.parentElement
            // var glazeOptions = document.getElementById("glaze-options"); // get all the glaze options
            // var glazeSelection = glazeOptions.options[glazeOptions.selectedIndex].text; //get the selected galze 

            // let numberInCart = item.getElementsByClassName("numCart")[0].textContent
            subtractCost(item)
        })
    }
}

function subtractCost(item){
    //change number in cart
    let productNumbers = parseInt(localStorage.getItem ('cartNum'))
    let totalProduct = productNumbers - parseInt(numberInCart)
    console.log(totalProduct)
    localStorage.setItem('cartNum', totalProduct)
    document.getElementById('numOfCartItems').innerText = '[' + totalProduct + ']'
    //change total 
    let price = item.getElementsByClassName('total')[0].innerText
    let title = item.getElementsByClassName("title")[0].innerText
    let cartCost = localStorage.getItem('totalCost')
    newTotal = parseFloat(cartCost) - (parseFloat(price)*(numberInCart))
    localStorage.setItem("totalCost", newTotal)       
    if (option == "yes"){  
        remove(title)
    } else{
        setItems(item, -numberInCart)
    }
    updateCartTotal()
    displayCart()
    location.reload()
}

function onLoadCartNumbers() {
    var itemTotalNumber = localStorage.getItem('cartNum')
    console.log(itemTotalNumber)
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


function addOrderToCart() {
    var cartNum = localStorage.getItem('cartNum')
    cartNum = parseInt(cartNum)
    var getRollNumOptions = document.getElementById("numOfRolls"); //get the number of roll options 1,3,6,12
    var rollNumSelected = getRollNumOptions.options[getRollNumOptions.selectedIndex].textContent; //get the roll selected by the user
    var numOfRolls = parseInt(rollNumSelected) //convert num rolls options to int 
    var cartNum = document.getElementById("cartNum").innerText; //get the current item number in the cart
    var cartInt = parseInt(cartNum) //convert the cart item number to int
    var getNumBoxes = document.getElementById("numOfBoxes"); //get the number of boxes inputed by the user 
    var numOfBoxes = parseInt(getNumBoxes.value); //covert number of boxes to int 
    document.getElementById("cartNum").textContent = cartInt + (numOfRolls * numOfBoxes)//update the cart by adding the product of the roll number and box number  
    var cartNum = document.getElementById("cartNum").innerText; //get the current item number in the cart
    localStorage.setItem("cartNum", cartNum);
    var glazeOptions = document.getElementById("glaze-options"); // get all the glaze options
    var glazeSelection = glazeOptions.options[glazeOptions.selectedIndex].text; //get the selected galze 
    var itemPrice = document.getElementById("originalRollPrice").textContent; //get the item's price 
    var name = document.getElementById("Original-Heading").innerText; //get the name of the product 
    itemsArray(name, glazeSelection, numOfRolls, numOfBoxes, itemPrice, cartNum); //pass values into items Array as parameters 
    displayCart()

}

function itemsArray(name, glaze, rolls, boxes, price, cartNum) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'))
    console.log(glaze);
    product = {
        name,
        glaze,
        rolls,
        boxes,
        price,
        cartNum,
    }

    console.log(cartItems)
    if (cartItems != null) {
        if (cartItems[product.glaze] == undefined) {
            cartItems = {
                ...cartItems,
                [product.glaze]: product
            }
            console.log("!")

        }
        console.log("!!!")
        cartItems[product.glaze].cartNum += 1
    } else {
        product.cartNum = 1
        cartItems = {
            [product.glaze]: product
        }
        console.log("$$")

    }

    // if (cartNum == 1)
    // {
    // 	var cartItems = new Array(product); //create new array if it is the first item being added 
    // }
    // else if (cartNum > 1)
    // {
    // 	var cartItems = JSON.parse(localStorage.getItem('productsInCart'))   //get the current array
    //     if ({

    //     }
    //     else {
    //         cartItems.push(product); //add product to array 
    //     }
    // }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); //store the array
}

function displayCart() {
    // referenced YouTube tutorial https://www.youtube.com/watch?v=IY5UN82FZ2Q

    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
    let products = document.getElementById("products");
    if (cartItems && products) {
        products.innerHTML = '';
        Object.values(cartItems).map(item => {
            if (item.cartNum > 0) {
                var cartRowInfo = `
                <div class = "cartItems">
                  <h4 class = "cart-original-text">${item.name}</h4>
                  <h4 class = "cart-glaze">${item.glaze}</h4>
                  <h4 class = "cart-rolls">${item.rolls}</h4>
                  <h4 class = "cart-boxes">${item.boxes}</h4>
                  <h4 class = "cart-price">$${item.price}.00</h4>
                  <h4 class = "cart-edit">Edit</h4>
                  <h4 class="delete-item">Delete</h4>
                </div>`
                products.innerHTML += cartRowInfo
            }
        })
    }
}

function removeItem() {
    console.log(glaze)
    let obj = JSON.parse(localStorage.getItem('productsInCart'))
    let items = Object.entries(obj)
    for (var i = 0; i < items.length; i++) { //loop over the collection
        if (items[i][0] == glaze) { //see if ids match
            console.log(items[i][0])
            items.splice(i, 1); //remove item from array
            console.log(items)
            break; //exit loop
        }
    }
    temp = Object.fromEntries(items)
    localStorage.setItem("productsInCart", JSON.stringify(temp)); //set item back into storage
}

displayCart()
onLoadCartNumbers()

