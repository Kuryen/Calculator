let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        // Use regular expression to split the input into operands and operators
        const expression = displayValue;
        const operators = expression.split(/[0-9.]+/).filter(Boolean);
        const operands = expression.split(/[-+*/]+/).map(Number);

        if (operators.length === operands.length - 1) {
            let result = operands[0];
            for (let i = 0; i < operators.length; i++) {
                switch (operators[i]) {
                    case '+':
                        result += operands[i + 1];
                        break;
                    case '-':
                        result -= operands[i + 1];
                        break;
                    case '*':
                        result *= operands[i + 1];
                        break;
                    case '/':
                        if (operands[i + 1] === 0) {
                            throw new Error('Division by zero');
                        }
                        result /= operands[i + 1];
                        break;
                    default:
                        throw new Error('Invalid operator');
                }
            }
            displayValue = result.toString();
            document.getElementById('display').value = result;
        } else {
            throw new Error('Invalid expression');
        }
    } catch (error) {
        displayValue = '';
        document.getElementById('display').value = 'Error';
    }
}