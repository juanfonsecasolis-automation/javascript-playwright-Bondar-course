// Loops

// approach 1
for(let i=0; i<10; i++)
{
    console.log('Hello World!')
}

// approach 2
var cars = ['Volvo', 'Toyota', 'Tesla']
for(let car of cars)
{ 
    if(car == 'Tesla')
    {
        continue   
    }
    console.log(car)
}

// approach 3
cars.forEach(car => {
    console.log(car)
})