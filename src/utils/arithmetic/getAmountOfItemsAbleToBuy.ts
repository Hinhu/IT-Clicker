import sumOfNElementsInArithmeticSequence from './sumOfNElementsInArithmeticSequence';

function numOfElementsInArithmeticSequenceToReachSum(sum: number, c: number, d: number) {
  return (Math.sqrt(4 * c * c - 4 * c * d + d * d + 8 * d * sum) - 2 * c + d) / (2 * d)
}

function getAmountOfItemsAbleToBuy(currentBalance: number, currentItemCount: number, baseItemPrice: number, priceIncrementPerItem: number) {
  const costOfPastItems = sumOfNElementsInArithmeticSequence(currentItemCount, baseItemPrice, priceIncrementPerItem);
  const costMax = costOfPastItems + currentBalance;

  const amountMax = Math.floor(numOfElementsInArithmeticSequenceToReachSum(costMax, baseItemPrice, priceIncrementPerItem));
  return amountMax - currentItemCount;
}

export default getAmountOfItemsAbleToBuy;