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
         // Calculate expressions following the order of operations
         const orderOfOperations = [['*', '/'], ['+', '-']];
         for (const operatorsGroup of orderOfOperations) {
            for (let i = 0; i < operators.length; i++) {
               if (operatorsGroup.includes(operators[i])) {
                  switch (operators[i]) {
                     case '*':
                        operands[i] *= operands[i + 1];
                        break;
                     case '/':
                        if (operands[i + 1] === 0) {
                           throw new Error('Division by zero');
                        }
                        operands[i] /= operands[i + 1];
                        break;
                     case '+':
                        operands[i] += operands[i + 1];
                        break;
                     case '-':
                        operands[i] -= operands[i + 1];
                        break;
                     default:
                        throw new Error('Invalid operator');
                  }
                  operators.splice(i, 1);
                  operands.splice(i + 1, 1);
                  i--;
               }
            }
         }
         const result = operands[0];
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