function sumOfNElementsInArithmeticSequence(n: number, c: number, d: number) {
  return (n * (2 * c + d * (n - 1))) / 2;
}

export default sumOfNElementsInArithmeticSequence;
