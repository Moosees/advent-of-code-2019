const fs = require('fs');
const readline = require('readline');

const fuelCalculator = mass => {
  const fuelRequired = Math.floor(mass / 3) - 2;
  return fuelRequired > 0 ? fuelRequired : 0;
};

const countFuelForTheCounterUpper = async (input, calculator) => {
  let counterUpper = 0;

  try {
    const fileStream = fs.createReadStream(input);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      counterUpper += calculator(line);
    }
    return counterUpper;
  } catch (err) {
    console.error(err);
  }
};

countFuelForTheCounterUpper('./input.txt', fuelCalculator).then(answer =>
  console.log('Fuel Required: ', answer)
);
