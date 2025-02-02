// script.js

let displayValue = '';

function handleInput(input) {
    if (['sin', 'cos', 'tan', 'sqrt', 'pow'].includes(input)) {
        displayValue += `${input}(`;
    } else if (input === '!') {
        // Handle factorial input
        const lastNumber = extractLastNumber(displayValue);
        if (lastNumber !== null) {
            displayValue += `factorial(${lastNumber})`;
        } else {
            displayValue += 'Error'; // Handle error if input is invalid
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
        const sanitizedInput = displayValue
            .replace(/sin\((.*?)\)/g, 'Math.sin($1)')
            .replace(/cos\((.*?)\)/g, 'Math.cos($1)')
            .replace(/tan\((.*?)\)/g, 'Math.tan($1)')
            .replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)')
            .replace(/pow\((.*?),(.*?)\)/g, 'Math.pow($1,$2)')
            .replace(/factorial\((.*?)\)/g, 'factorial($1)');

        const result = Function(`"use strict"; return (${sanitizedInput})`)();
        displayValue = result.toString();
    } catch (error) {
        displayValue = 'Error';
    }
    updateDisplay();
}

function factorial(n) {
    n = parseInt(n);
    if (n < 0) return 'Error'; 
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function extractLastNumber(str) {
    const matches = str.match(/(\d+|\.\d+)(?!.*\d)/);
    return matches ? matches[0] : null;
}
