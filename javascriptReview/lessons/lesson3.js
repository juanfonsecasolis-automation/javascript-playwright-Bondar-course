// JS object (dictionary)
var customer = {
    firstName: 'John',
    lastName: 'Smith',
    cars: ['Volvo', 'Toyota', 'Tesla']
}
console.log(customer)
console.log(customer.firstName) // dot notation
console.log(customer['firstName'])  // bracket notation

customer.firstName = "Michael"
console.log(`${customer.firstName} ${customer.lastName}`)

// arrays
var car = [
    'Volvo', 'Toyota', 'Tesla'
]

console.log(car[0])
car[1] = 'BMW'
console.log(car[1])

console.log(customer.cars[0])