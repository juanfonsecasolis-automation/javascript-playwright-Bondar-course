// Concatenation and interpolation
var price = 4
var itemName = "coffee"

// Approach 1: concatenation
var messageToPrint1 = 
    "The price for your " + itemName + " is " + price + " dollars."
console.log(messageToPrint1)

// Approach 2: interpolation
var messageToPrint2 = 
    `The price for your ${itemName} is ${price} dollars.`
console.log(messageToPrint2)