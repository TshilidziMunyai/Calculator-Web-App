// script.js

let displayValue = '';

function handleInput(input) {
    if (['sin', 'cos', 'tan', 'sqrt', 'pow'].includes(input)) {
        displayValue += `${input}(`;
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
        // Replace mathematical functions with their JS equivalents
        const sanitizedInput = displayValue
            .replace(/sin\((.*?)\)/g, 'Math.sin($1)')
            .replace(/cos\((.*?)\)/g, 'Math.cos($1)')
            .replace(/tan\((.*?)\)/g, 'Math.tan($1)')
            .replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)')
            .replace(/pow\((.*?),(.*?)\)/g, 'Math.pow($1,$2)');

        // Secure evaluation
        const result = Function(`"use strict"; return (${sanitizedInput})`)();
        displayValue = result.toString();
    } catch (error) {
        displayValue = 'Error';
    }
    updateDisplay();
}
