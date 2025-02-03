let displayValue = '';

function handleInput(input) {
    if (['sin', 'cos', 'tan', 'sqrt', 'pow'].includes(input)) {
        displayValue += `${input}(`;
    } else if (input === '!') {
        const lastNumber = extractLastNumber(displayValue);
        if (lastNumber !== null) {
            displayValue = displayValue.replace(lastNumber, `factorial(${lastNumber})`);
        } else {
            displayValue += 'Error'; 
        }
    } else {
        displayValue += input;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('calc-display').value = displayValue;
}

function calculate() {
    try {
        let input = displayValue.trim();
        console.log("Raw Input:", input); 

        if (input.includes("sin(")) input = replaceFunction(input, "sin", Math.sin);
        if (input.includes("cos(")) input = replaceFunction(input, "cos", Math.cos);
        if (input.includes("tan(")) input = replaceFunction(input, "tan", Math.tan);
        if (input.includes("sqrt(")) input = replaceFunction(input, "sqrt", Math.sqrt);
        if (input.includes("pow(")) input = replacePowFunction(input);
        if (input.includes("factorial(")) input = replaceFactorialFunction(input);

        console.log("Processed Input:", input); 

        let result = evaluateArithmetic(input);
        displayValue = result.toString();
    } catch (error) {
        displayValue = "Error";
    }
    updateDisplay();
}

// Function to replace a mathematical function like sin(), cos(), amd all that.
function replaceFunction(expression, funcName, mathFunction) {
    while (expression.includes(funcName + "(")) {
        let start = expression.indexOf(funcName + "(");
        let end = expression.indexOf(")", start);
        if (end === -1) return "Error"; 

        let value = expression.substring(start + funcName.length + 1, end).trim();
        let number = parseFloat(value);
        if (isNaN(number)) return "Error";

        if (["sin", "cos", "tan"].includes(funcName)) {
            number = number * (Math.PI / 180); 
        }

        let result = mathFunction(number);
        expression = expression.substring(0, start) + result + expression.substring(end + 1);
    }
    return expression;
}

// Function to replace pow(base, exponent)
function replacePowFunction(expression) {
    while (expression.includes("pow(")) {
        let start = expression.indexOf("pow(");
        let end = expression.indexOf(")", start);
        if (end === -1) return "Error";

        let inner = expression.substring(start + 4, end).trim();
        let parts = inner.split(",");
        if (parts.length !== 2) return "Error";

        let base = parseFloat(parts[0]);
        let exp = parseFloat(parts[1]);
        if (isNaN(base) || isNaN(exp)) return "Error";

        let result = Math.pow(base, exp);
        expression = expression.substring(0, start) + result + expression.substring(end + 1);
    }
    return expression;
}

// Function to replace factorial(n)
function replaceFactorialFunction(expression) {
    while (expression.includes("factorial(")) {
        let start = expression.indexOf("factorial(");
        let end = expression.indexOf(")", start);
        if (end === -1) return "Error";

        let number = parseInt(expression.substring(start + 9, end).trim());
        if (isNaN(number)) return "Error";

        let result = factorial(number);
        expression = expression.substring(0, start) + result + expression.substring(end + 1);
    }
    return expression;
}

// Function to evaluate arithmetic expressions safely
function evaluateArithmetic(expression) {
    let numbers = expression.split(/[\+\-\*\/]/).map(num => parseFloat(num.trim()));
    let operators = expression.match(/[\+\-\*\/]/g) || [];

    console.log("Numbers:", numbers);
    console.log("Operators:", operators);

    if (numbers.includes(NaN)) return "Error";

    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        let nextNum = numbers[i + 1];
        switch (operators[i]) {
            case "+": result += nextNum; break;
            case "-": result -= nextNum; break;
            case "*": result *= nextNum; break;
            case "/":
                if (nextNum === 0) return "Error"; 
                result /= nextNum;
                break;
        }
    }
    return result;
}

function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to extract the last number from a string
function extractLastNumber(str) {
    const matches = str.match(/(\d+|\.\d+)(?!.*\d)/);
    return matches ? matches[0] : null;
}
