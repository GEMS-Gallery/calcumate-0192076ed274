// frontend/index.js
import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    document.querySelectorAll('.key').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('operator')) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                } else {
                    calculate();
                    operator = value;
                }
            } else if (value === '=') {
                calculate();
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    async function calculate() {
        if (firstOperand !== null && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    result = await backend.divide(firstOperand, secondOperand);
                    if (result === null) {
                        display.textContent = 'Error';
                        return;
                    }
                    break;
            }
            display.textContent = result;
            firstOperand = result;
            currentInput = '';
        }
    }
});
