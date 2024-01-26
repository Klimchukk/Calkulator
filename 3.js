document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.addEventListener('click', function (event) {
        const clickedButton = event.target;

        if (clickedButton.tagName === 'BUTTON') {
            const buttonValue = clickedButton.dataset.value;

            if (!isNaN(buttonValue) || buttonValue === '.') {
                // If the clicked button is a number or a dot
                currentInput += buttonValue;
            } else if (buttonValue === 'AC') {
                // Clear all
                currentInput = '';
                previousInput = '';
                operator = '';
            } else if (buttonValue === 'DEL') {
                // Delete the last character
                currentInput = currentInput.slice(0, -1);
            } else if (buttonValue === '=') {
                // Perform calculation
                if (currentInput !== '' && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    previousInput = '';
                    operator = '';
                }
            } else {
                // If the clicked button is an operator
                if (currentInput !== '' && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    previousInput = currentInput;
                } else {
                    previousInput = currentInput;
                }

                operator = buttonValue;
                currentInput = '';
            }

            // Update the display
            display.value = currentInput === '' ? '0' : currentInput;
        }
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            case '%':
                return (num1 % num2).toString();
            default:
                return num2.toString();
        }
    }
});
