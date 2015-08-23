var Calculator = function() {
    this.value;

    this.doOperator = function(amount, operator) {
        operation = function(lhs, rhs) {
            switch(operator) {
            case "add":
                return lhs + rhs;
            case "subtract":
                return lhs - rhs;
            case "multiply":
                return lhs * rhs;
            case "divide":
                return lhs / rhs;
            case "modulo":
                return lhs % rhs;
            }
        };

        this.value = operation.call(null, this.value, amount);
        return this.value;
    };
};

Calculator.prototype.add = function(amount) {
    return this.doOperator(amount, "add");
};

Calculator.prototype.subtract = function(amount) {
    return this.doOperator(amount, "subtract");
};

Calculator.prototype.multiply = function(amount) {
    return this.doOperator(amount, "multiply");
};

Calculator.prototype.divide = function(amount) {
    return this.doOperator(amount, "divide");
};

Calculator.prototype.modulo = function(amount) {
    return this.doOperator(amount, "modulo");
};

Calculator.prototype.equals = function(amount) {
    return this.doOperator(amount, "equals");
};


var Expression = function(lhs, operand, rhs) {
    this.lhs = lhs || null;
    this.operand = operand || null;
    this.rhs = rhs || null;
};

Expression.prototype.isValid = function() {
    return this.lhs !== null && this.operand !== null && this.rhs !== null;
};


$(document).ready(function() {
    var calculator = new Calculator();
    var display = $('#answer');
    var shouldReplace = false;

    var expression = new Expression();

    $('.calculator .row button').each(function() {
        var widget = $(this);

        widget.click(function(evt) {
            var button = $(this);
            var input = button.text();
            var text;

            if (input.match(/[0-9]|\./)) {
                if (expression.operand) {
                    if (expression.rhs === null) {
                        text = input;
                    } else {
                        text = display.val() + "" + input;
                    }

                    expression.rhs = new Number(text);
                } else {
                    text = display.val() + "" + input;
                    expression.lhs = new Number(text);
                }
            } else if (input === "CE") {
                if (expression.rhs) {
                    expression.rhs = null;
                } else {
                    expression.lhs = null;
                }
                text = "";
            } else if (input === "AC") {
                expression = new Expression();
                calculator = new Calculator();
                text = "";
            } else {
                if (expression.isValid()) {
                    calculator.value = expression.lhs;
                    switch (expression.operand) {
                        case "+":
                            calculator.add(expression.rhs);
                            break;
                        case "-":
                            calculator.subtract(expression.rhs);
                            break;
                        case "\u00D7":
                            calculator.multiply(expression.rhs);
                            break;
                        case "\u00F7":
                            calculator.divide(expression.rhs);
                            break;
                        case "%":
                            calculator.modulo(expression.rhs);
                            break;
                    }
                    expression.lhs = calculator.value;
                    text = expression.lhs
                } else {
                    text = display.val();
                    expression.rhs = null;
                }

                if (input !== "=") {
                    expression.operand = input;
                    expression.rhs = null;
                }
            }

            display.val(text);
        });
    });
});
