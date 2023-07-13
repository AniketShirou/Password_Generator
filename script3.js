console.log("Functions")

//function declartion
function print()
{
    for(let i=0;i<5;i++)
    {
        console.log(i);
    }
}

// function call and invoke
//HOISTING : Process of moving function declartion to the top of file automatically by JS engine
print();

// function assigment[Named]
let stand = function walk()
{
    console.log("walking");
}

stand();

let jump = stand;
jump();

//function assigment[Anonymous]
let stand2 = function()
{
    console.log("walking and standing");
}

stand2();

console.log("------------------------------------");

//Dynamic Nature Of Function[special object : arguments]
function sum()
{
    console.log(arguments)
    let total=0;
    for(let values of arguments)
    {
        total+=values;
    }

    return total;
}

console.log(sum(1,2))
console.log(sum(1))
console.log(sum())
console.log(sum(1,2,3,4,5))

console.log("------------------------------------");

//Rest operator : ... [mutiple parameter storing in array]
function summation(...args)
{
    console.log(args);
}

summation(1,2,3,4,5);

console.log("------------------------------------");

// default parameters
function interest(p=1000,r=10,y=5)
{
    return (p*r*y)/100;
}

console.log(interest(1000,8,6))

console.log("------------------------------------");

//Getter and Setter[IMP]

let person={
    firstname:"Aniket" ,
    lastname:"Rana" ,

    set fullName(value){
        if(typeof value !== 'string')
        {
            throw new Error("You Have Not Sent a string")
        }
        let parts=value.split(' ');
        this.firstname=parts[0];
        this.lastname=parts[1];
    }
    ,
    get fullName(){
        return `${person.firstname} ${person.lastname}` ;
    }
}

console.log(person.fullName) // get
person.fullName="Abhishek Rana"; // set
console.log(person.fullName)  // get

console.log("------------------------------------");

//Try and Catch [ Error Handling ]

try{
    person.fullName=true;
}
catch(e){
    alert(e);
}






