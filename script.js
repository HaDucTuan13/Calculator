let firstNumber="";
let operator=null;
let secondNumber="";
let justCalculated=false;
const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#backspace");

function add(a,b){
    return a+b;
}
function minus(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(a,operator,b){
    if(operator =="+")return add(a,b);
    if(operator =="-")return minus(a,b);
    if(operator =="*")return multiply(a,b);
    if(operator =="/"){
        if(b==0){
            return "Error! Divide by zero is wrong, you know?";
        }
        return divide(a,b);
    }
}

digits.forEach(button => {
    button.addEventListener("click",()=>{
        if(justCalculated){
            firstNumber="";
            secondNumber="";
            operator=null;
            justCalculated=false;
        }
        if(operator===null){
            firstNumber+=button.textContent;
            display.textContent=firstNumber;
        }else{
            secondNumber= secondNumber+button.textContent;
            display.textContent=secondNumber;
        }
    });
});

operators.forEach(button=>{
    button.addEventListener("click",()=>{
        if(secondNumber!==""){
            const a = parseFloat(firstNumber);
            const b = parseFloat(secondNumber);
            const result= operate(a,operator,b);
            display.textContent=result.toFixed(2);
            if(typeof(result)=="number"){
            firstNumber=result.toString();
            secondNumber="";
        }else{
            display.textContent=result;
            firstNumber="";
        }
        secondNumber="";
        }else{
            operator=button.textContent;
            display.textContent = operator;
        }
    })
});

equal.addEventListener("click",()=>{
    if(secondNumber!==""){
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);
    const result= operate(a,operator,b);
    if(typeof(result)=="number"){
        if(Number.isInteger(result)){
            display.textContent=result;
        }else{
            display.textContent=result.toFixed(2);
        }
        firstNumber=result.toString();
    }else{
        display.textContent=result;
        firstNumber="";
    }
    secondNumber="";
    operator=null;
    justCalculated=true;
    }
});

clear.addEventListener("click",()=>{
    firstNumber="";
    secondNumber="";
    operator=null;
    display.textContent="";
});

decimal.addEventListener("click",()=>{
    if(justCalculated){
        firstNumber="";
        secondNumber="";
        operator=null;
        justCalculated=false;
    }
    if (operator==null){
        if(!firstNumber.includes(".")){
            firstNumber+=".";
            display.textContent=firstNumber;
        }
    }else {
        if(!secondNumber.includes(".")){
            secondNumber+=".";
            display.textContent+=secondNumber;
        }
    }
})

backspace.addEventListener("click",()=>{
    if (operator==null){
        if(!firstNumber.includes(".")){
            firstNumber = firstNumber.slice(0,-1);
            display.textContent=firstNumber;
        }
    }else {
        if(!secondNumber.includes(".")){
            secondNumber = secondNumber.slice(0,-1);
            display.textContent+=secondNumber;
        }
    }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    // số 0–9
    if (operator === null) {
      firstNumber += key;
      display.textContent = firstNumber;
    } else {
      secondNumber += key;
      display.textContent = secondNumber;
    }
  } else if (["+", "-", "*", "/"].includes(key)) {
    // toán tử
    if (secondNumber !== "") {
      const a = parseFloat(firstNumber);
      const b = parseFloat(secondNumber);
      const result = operate(a, operator, b);
      display.textContent = Number.isInteger(result) ? result : result.toFixed(2);
      firstNumber = result.toString();
      secondNumber = "";
    }
    operator = key;
  } else if (key === "Enter" || key === "=") {
    // bằng
    if (secondNumber !== "") {
      const a = parseFloat(firstNumber);
      const b = parseFloat(secondNumber);
      const result = operate(a, operator, b);
      display.textContent = Number.isInteger(result) ? result : result.toFixed(2);
      firstNumber = result.toString();
      secondNumber = "";
      operator = null;
    }
  } else if (key === "Backspace") {
    // xoá ký tự cuối
    if (operator === null) {
      firstNumber = firstNumber.slice(0, -1);
      display.textContent = firstNumber;
    } else {
      secondNumber = secondNumber.slice(0, -1);
      display.textContent = secondNumber;
    }
  } else if (key === ".") {
    // dấu thập phân
    if (operator === null) {
      if (!firstNumber.includes(".")) {
        firstNumber += ".";
        display.textContent = firstNumber;
      }
    } else {
      if (!secondNumber.includes(".")) {
        secondNumber += ".";
        display.textContent = secondNumber;
      }
    }
  }
});
