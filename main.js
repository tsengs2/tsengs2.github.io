var rollPrice = 4; // declare global variable for rollPrice

function updateGlazeImage() {
	var glazeOptions = document.getElementById("glaze-options"); // get all the glaze options
    var largeGlazeImage = document.getElementById("original-large"); //get the original roll image 

	var selectedGlazeOptionValue = glazeOptions.options[glazeOptions.selectedIndex].value; //get the selected galze 
    // set a variable for each glaze's image
    var noGlaze="Assets/no-glaze.png";
    var vanillaGlaze="Assets/vanilla-roll-large.png";
    var doubleChoco="Assets/double-choco-large.png";
    var sugarMilk = "Assets/sugar-milk-large.png";

    // set the large iamge src depending on the selected glaze option
	if (selectedGlazeOptionValue=="none"){largeGlazeImage.src = noGlaze;}
    else if (selectedGlazeOptionValue=="vanilla"){largeGlazeImage.src= vanillaGlaze;}
	else if (selectedGlazeOptionValue=="chocolate"){largeGlazeImage.src=doubleChoco;}
	else if (selectedGlazeOptionValue="sugar"){largeGlazeImage.src=sugarMilk;}
}

function updateRollPrice () {
	var getRollNumOptions = document.getElementById("numOfRolls"); //get the number of roll options 1,3,6,12
	var rollNumSelected = getRollNumOptions.options[getRollNumOptions.selectedIndex].text; //get the roll selected by the user
	numOfRolls = parseInt(rollNumSelected) //convert num rolls options to int 
    // var getRollPrice = document.getElementById("originalRollPrice")    
    var getNumBoxes = document.getElementById("numOfBoxes") //get the number of boxes inputed by the user 
    var numOfBoxes = parseInt(getNumBoxes.value); //covert number of boxes to int 
	document.getElementById("originalRollPrice").textContent = rollPrice* numOfRolls * numOfBoxes //update the price by finding the product of the price, number of rolls, and number of boxes
}

function updateCartNumber (){

    var getRollNumOptions = document.getElementById("numOfRolls"); //get the number of roll options 1,3,6,12
    var rollNumSelected = getRollNumOptions.options[getRollNumOptions.selectedIndex].textContent; //get the roll selected by the user
    var numOfRolls = parseInt(rollNumSelected) //convert num rolls options to int 
    var cartNum = document.getElementById("cartNum").innerText; //get the current item number in the cart
    var cartInt = parseInt(cartNum) //convert the cart item number to int
    var getNumBoxes = document.getElementById("numOfBoxes"); //get the number of boxes inputed by the user 
    var numOfBoxes = parseInt(getNumBoxes.value); //covert number of boxes to int 
    document.getElementById("cartNum").textContent = cartInt + (numOfRolls * numOfBoxes)//update the cart by adding the product of the roll number and box number
   
}

