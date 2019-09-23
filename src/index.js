function bigFactorial(n) {
  let res = "1";

  for (let i = 1; i <= +n; i++) {
    res = multiply(String(i), res);
  }

  return res;
}

function bigDoubleFactorial(n) {
  let res = "1",
      num = +n,
      start_num = 1;

  if (!(num % 2))
    start_num = 2;

  for (let i = +start_num; i <= num; i += 2) {
     res = multiply(String(i), res);
  }

  return res;
}

function multiply(first, second) {
  let num1 = first.split('').reverse();
  let num2 = second.split('').reverse();

  let stack = [];

  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      let mult = num1[i] * num2[j];
      stack[i + j] = (stack[i + j]) ? stack[i + j] + mult : mult;
    }
  }

  for (let i = 0; i < stack.length; i++) {
    let num = stack[i] % 10;
    let move = Math.floor(stack[i] / 10);
    stack[i] = num;

    if (stack[i + 1])
      stack[i + 1] += move;
    else if (move != 0)
      stack[i + 1] = move;
  }

  return stack.reverse().join('');
}

module.exports = function zeros(expression) {
  let res = "1",
      multipliers_arr = expression.split("*");

  for (let multiplier of multipliers_arr) {
    let excl_marks = multiplier.match(/!+$/);

    let num_str = multiplier.match(/^[1-9]{1}\d*/);

    switch (excl_marks[0].length) {
      case 1:
        res = multiply(bigFactorial(num_str), res);
        break;
      case 2:
        res = multiply(bigDoubleFactorial(num_str), res);
        break;
    }
  }

  let zeros_num = res.match(/0*$/);

  return (zeros_num === null) ? 0 : zeros_num[0].length;
}