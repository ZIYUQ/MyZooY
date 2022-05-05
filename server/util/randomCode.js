function getRandomNumber() {
    return Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
}

module.exports = { getRandomNumber }