import sumOfNElementsInArithmeticSequence from './sumOfNElementsInArithmeticSequence';

function getItemsPrice(currentItemCount: number, baseItemPrice: number, priceIncrementPerItem: number, itemsToBuyCount: number) {
  return currentItemCount === 0 ? (
    sumOfNElementsInArithmeticSequence(itemsToBuyCount, baseItemPrice, priceIncrementPerItem)
  ) : (sumOfNElementsInArithmeticSequence(currentItemCount + itemsToBuyCount, baseItemPrice, priceIncrementPerItem) - sumOfNElementsInArithmeticSequence(currentItemCount, baseItemPrice, priceIncrementPerItem));
};

export default getItemsPrice;