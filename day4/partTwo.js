const input = '264793-803935';

// six digit number
// two adjacent digits are the same (double needed)
// the above group is only a double, but if it's present other groups can still be triples or more
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

// Late night sleepy solution, but it works. Using global and exec didn't
// produce the results I wanted :(
const findValidPasswords = (lowRange, highRange) => {
  const matchDouble = /(\d)\1{1,}/g;
  const matchSequence = /^0*1*2*3*4*5*6*7*8*9*$/;
  let counter = 0;

  for (let i = lowRange; i <= highRange; i++) {
    const matchedDouble = String(i).matchAll(matchDouble);
    if (matchedDouble && matchSequence.exec(i)) {
      const matches = [...matchedDouble].map(match => match[0].length === 2);
      if (matches.includes(true)) {
        counter++;
      }
    }
  }
  return counter;
};

// Remove some invalid passwords using logic on the ranges then iterate
// over the remaining passwords and run checks with regex to see if
// they are valid.
const findPossiblePasswords = input => {
  const [lowRange, highRange] = input.split('-');
  const cleanedLowRange = cleanLowRange(lowRange);
  const cleanedHighRange = cleanHighRange(highRange);
  const numValid = findValidPasswords(cleanedLowRange, cleanedHighRange);
  return numValid;
};

console.log('Answer: ', findPossiblePasswords(input));
