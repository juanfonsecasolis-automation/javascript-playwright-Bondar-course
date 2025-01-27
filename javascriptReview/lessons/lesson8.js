// Declarative functions
helloOne()
function helloOne()
{
    console.log('Hello one!')
}
helloOne()

// Anonymous function
// helloTwo() // this won't work (function declaration must go first)
var helloTwo = function(){
    console.log('Hello two!')
}
helloTwo()  

// ES6 function
var helloThree = () => {
    console.log('Hello three!')
}
helloThree()

// function with arguments
function printName(firstName, lastName)
{
    console.log(`Hello ${firstName} ${lastName}!`)
}
printName('Juan', 'Fonseca')

// function with return
function multiplyByTwo(number)
{
    return 2*number
}
console.log(multiplyByTwo(3))

// importing functions
import {printAge} from '../helper/printHelper.js'
printAge(5)

import * as helper from '../helper/printHelper.js'
helper.printAge(5)

