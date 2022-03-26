const randomicList = [];
let lastReadIdx = 0;

for (let i = 0; i < 100; i++) {
  const randNum = Math.round(Math.random() * 1000) + i * 5;
  if (randomicList.find((r) => r === randNum) === undefined) {
    randomicList.push(randNum);
  } else {
    i--;
  }
}

const logList = () => console.log(randomicList);

const getRandomNumber = () => {
  let randNumber = randomicList[lastReadIdx];
  lastReadIdx++;
  return randNumber;
};

const randomCheck = (probability) => {
  let isTrue = probability * 0.01 <= getRandomNumber();
  lastReadIdx++;
  return isTrue;
};

module.exports = {
  getRandomNumber,
  randomCheck,
  logList,
};
