var customerFirstName:string = "John"
var customerLastName:string = "Smith"
var customerAge:number = 25

// customerFirstName = 1000 // error: number is not assignable to a string (TS type verification)

// create new data type
type Customer = {
    firstName:string, 
    lastName:string, 
    active:boolean
}

// var firstCustomer:Customer = 1  // error: number is not assignable to a type Customer (TS type verification)
var firstCustomer:Customer = {
    firstName: "Mary",
    lastName: "Jones",
    active: true
}

