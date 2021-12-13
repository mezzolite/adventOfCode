const path = require('path');
const fsp = require('fsp');

const diagnosticReport = fsp
  .readFileSync(path.join(__dirname, 'day3input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n');

const diagnosticReportArrays = () =>
  diagnosticReport.map((report) => {
    const r = report.split('');
    return r;
  });

const arrayOfReportArrays = diagnosticReportArrays();

function getValuesArray(initialReportArray) {
  const indexObject = {};

  for (let i = 0; i < initialReportArray[0].length; i++) {
    indexObject[i] = [initialReportArray[0][i]];
  }
  initialReportArray.shift();
  initialReportArray.forEach((reportArray) => {
    for (let i = 0; i < reportArray.length; i++) {
      indexObject[i].push(reportArray[i]);
    }
  });

  return Object.values(indexObject);
}

function getGammaRate() {
  const valuesArray = getValuesArray(arrayOfReportArrays);
  const mostFrequent = valuesArray.map((values) =>
    values
      .sort((a, b) => values.filter((v) => v === a).length - values.filter((v) => v === b).length)
      .pop()
  );

  const mostFrequentString = mostFrequent.join('');

  return parseInt(mostFrequentString, 2);
}

function getEpsilonRate() {
  const valuesArray = getValuesArray(arrayOfReportArrays);
  const leastFrequent = valuesArray.map((values) =>
    values
      .sort((a, b) => values.filter((v) => v === b).length - values.filter((v) => v === a).length)
      .pop()
  );

  const leastFrequentString = leastFrequent.join('');

  return parseInt(leastFrequentString, 2);
}

console.log(getGammaRate() * getEpsilonRate());

function getMinsMaxes(lines) {
  let count = {};

  for (let line of lines) {
    for (let i = 0; i < line.length; i++) {
      if (!count[i]) {
        // Initialize [zeros_count, ones_count]
        count[i] = [0, 0];
      }

      let val = +line[i];
      count[i][val]++;
    }
  }

  let mins = [];
  let maxs = [];
  for (let counts of Object.values(count)) {
    if (counts[0] === counts[1]) {
      maxs.push(null);
      mins.push(null);
    } else if (counts[0] > counts[1]) {
      maxs.push('0');
      mins.push('1');
    } else {
      maxs.push('1');
      mins.push('0');
    }
  }

  return {
    min: mins,
    max: maxs,
  };
}

function getOxygenGeneratorRating() {
  let oxy = [...diagnosticReport];
  let bit = 0;
  while (oxy.length > 1) {
    let { max } = getMinsMaxes(oxy);
    oxy = oxy.filter((num) => {
      return max[bit] === null ? num[bit] === '1' : num[bit] === max[bit];
    });

    bit++;
  }

  return parseInt(oxy[0], 2);
}

function getCO2ScrubberRating() {
  let co2 = [...diagnosticReport];
  let bit = 0;
  while (co2.length > 1) {
    let { min } = getMinsMaxes(co2);
    co2 = co2.filter((num) => {
      return min[bit] === null ? num[bit] === '0' : num[bit] === min[bit];
    });
    bit++;
  }

  return parseInt(co2[0], 2);
}

console.log(getOxygenGeneratorRating() * getCO2ScrubberRating());
