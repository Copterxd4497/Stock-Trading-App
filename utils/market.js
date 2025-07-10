class Market {
  currentIndex() {
    const random = Math.random() * (1500 - 600) + 600;
    const index = random.toFixed(2);

    return index;
  }
}
module.exports = Market;
