export function printAge(age)
// specify 'export' keyword so function can be used outside the scope of this file
{
    console.log(`Age is ${age}.`)
}

export class CustomerDetails
{
    /**
     * Method prints the first name
     * @param {string} firstName 
     */
    printFirstName(firstName){
        console.log(firstName)
    }

    /**
     * Method prints the last name
     * @param {string} lastName 
     */
    printLastName(lastName){
        console.log(lastName)
    }
}

export const customerDetails = new CustomerDetails()