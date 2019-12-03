// prettier-ignore
const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,9,19,23,1,23,5,27,2,27,10,31,1,6,31,35,1,6,35,39,2,9,39,43,1,6,43,47,1,47,5,51,1,51,13,55,1,55,13,59,1,59,5,63,2,63,6,67,1,5,67,71,1,71,13,75,1,10,75,79,2,79,6,83,2,9,83,87,1,5,87,91,1,91,5,95,2,9,95,99,1,6,99,103,1,9,103,107,2,9,107,111,1,111,6,115,2,9,115,119,1,119,6,123,1,123,9,127,2,127,13,131,1,131,9,135,1,10,135,139,2,139,10,143,1,143,5,147,2,147,6,151,1,151,5,155,1,2,155,159,1,6,159,0,99,2,0,14,0];

// Opcodes:
// 99 - stop
// 1 - add two following positions and store in third
// 2 - multiply like above

// Inputs:
// 0 - 99
// Noun - value at address 1
// Verb - value at address 2
// Desired output - 19690720
// Answer - 100 * noun + verb

const hackTheIntercodeProgram = (input, noun = 12, verb = 2) => {
  const hackedInput = [...input];
  hackedInput[1] = noun;
  hackedInput[2] = verb;
  let opcodeIndex = 0;
  let readIndex1 = 1;
  let readIndex2 = 2;
  let storageIndex = 3;

  while (hackedInput[opcodeIndex]) {
    readIndex1 = hackedInput[opcodeIndex + 1];
    readIndex2 = hackedInput[opcodeIndex + 2];
    storageIndex = hackedInput[opcodeIndex + 3];

    if (hackedInput[opcodeIndex] === 99) {
      break;
    } else if (hackedInput[opcodeIndex] === 1) {
      hackedInput[storageIndex] =
        hackedInput[readIndex1] + hackedInput[readIndex2];
    } else if (hackedInput[opcodeIndex] === 2) {
      hackedInput[storageIndex] =
        hackedInput[readIndex1] * hackedInput[readIndex2];
    }
    opcodeIndex += 4;
  }
  return hackedInput[0];
};

const findTheOutput = (input, answer) => {
  let noun = 0;
  let verb = 0;
  let output = 0;
  while (true) {
    output = hackTheIntercodeProgram(input, noun, verb);
    if (output > answer) {
      noun--;
      break;
    } else {
      noun++;
    }
  }
  while (true) {
    output = hackTheIntercodeProgram(input, noun, verb);
    if (output > answer) {
      verb--;
      break;
    } else {
      verb++;
    }
  }
  return 100 * noun + verb;
};

console.log(findTheOutput(input, 19690720));
