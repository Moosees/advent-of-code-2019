const input = '264793-803935';

// six digit number
// two adjacent digits are the same (double needed)
// digits never decrease (from left to right)

const cleanLowRange = range => {
  const newRange = [...range].map(digit => Number(digit));
  let resetDigits = false;
  let resetValue = undefined;
  for (let i = 1; i < newRange.length; i++) {
    if (resetDigits) {
      newRange[i] = resetValue;
    } else if (newRange[i - 1] > newRange[i]) {
      resetDigits = true;
      resetValue = newRange[i - 1];
      newRange[i] = resetValue;
    }
  }
  return newRange.join('');
};

const cleanHighRange = range => {
  const newRange = [...range].map(digit => Number(digit));
  let resetDigits = false;
  for (let i = 1; i < newRange.length; i++) {
    if (resetDigits) {
      newRange[i] = 9;
    } else if (newRange[i - 1] > newRange[i]) {
      newRange[i - 1] -= 1;
      newRange[i] = 9;
      resetDigits = true;
    }
  }
  return newRange.join('');
};

const findValidPasswords = (lowRange, highRange) => {
  const matchDouble = /(\d)\1/;
  const matchSequence = /^0*1*2*3*4*5*6*7*8*9*$/;
  let counter = 0;

  for (let i = lowRange; i <= highRange; i++) {
    if (matchDouble.exec(i) && matchSequence.exec(i)) counter++;
  }
  return counter;
};

const findPossiblePasswords = input => {
  const [lowRange, highRange] = input.split('-');
  const cleanedLowRange = cleanLowRange(lowRange);
  const cleanedHighRange = cleanHighRange(highRange);
  const numValid = findValidPasswords(cleanedLowRange, cleanedHighRange);
  return numValid;
};

console.log('Answer: ', findPossiblePasswords(input));
