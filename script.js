const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthDisplay]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
uppercaseCheck.checked = true;
handleSlider();
//set strength circle color to grey
setIndicator("#ccc");

// set passwordLength
function handleSlider(){
     inputSlider.value = passwordLength;
     lengthDisplay.innerText = passwordLength;
     const min = inputSlider.min;
     const max = inputSlider.max;
     inputSlider.style.backgroundSize = ((passwordLength - min) * 100) / (max - min) + "% 100%";

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min , max){
    return Math.floor( Math.random() * (max - min) ) + min ;
}

function generateRandomNumber(){
    return getRandomInteger(0,10);
}

function generateRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateRandomSymbol(){
   const randomNum = getRandomInteger(0,symbols.length);
   return symbols.charAt(randomNum);
}

function calcStrength(){
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }

    catch(e){
        copyMsg.innerText="Failed";
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    } , 2000);

}

inputSlider.addEventListener('input' ,(e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
   if(passwordDisplay.value)
   {
    copyContent();
   }
})


//FOR GENERATE BUTTON: -

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      array.forEach((el) => (str += el));
      return str;
}

function handleCheckBoxChange(){
   checkCount = 0;
   allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked){
        checkCount++;
    }
   });

   // special condition
   if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
   }
}

allCheckBox.forEach( (checkbox)=>{
  checkbox.addEventListener('change' , handleCheckBoxChange);
})

generateBtn.addEventListener('click' ,()=>{
    // none of the checkBox are selected
    if(checkCount == 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let start the journey to find new password

    //Step 1:remove old password
    password="";

    // Step 2: fill the password
    let funArr = [];
    
    if(uppercaseCheck.checked)
        funArr.push(generateRandomUpperCase);

    if(lowercaseCheck.checked)
        funArr.push(generateRandomLowerCase);    

    if(numbersCheck.checked)
        funArr.push(generateRandomNumber);
        
    if(symbolsCheck.checked)
        funArr.push(generateRandomSymbol);

    
    // compulsory addition
    for(let i=0;i<funArr.length;i++)
    {
        password+=funArr[i]();
    }   
    
    //remaining addition
    for(let i=0;i<passwordLength - funArr.length; i++)
    {
        let randIndex = getRandomInteger(0 , funArr.length);
        password +=funArr[randIndex]()
    }
    
    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value=password;

    //calculate strength
    calcStrength();


})
