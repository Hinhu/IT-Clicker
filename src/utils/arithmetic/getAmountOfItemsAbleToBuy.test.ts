import getAmountOfItemsAbleToBuy from "./getAmountOfItemsAbleToBuy"

const BASE_ITEM_PRICE = 10;
const PRICE_INC_PER_ITEM = 2;


test('calcs 0 for insufficient funds for first item', () => {
  const amount = getAmountOfItemsAbleToBuy(2, 0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(0);
});

test('calcs 1 for exact funds for first item', () => {
  const amount = getAmountOfItemsAbleToBuy(10, 0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(1);
});

test('calcs 1 for non exact funds for first item', () => {
  const amount = getAmountOfItemsAbleToBuy(15, 0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(1);
});

test('calcs 2 for exact funds for 2 first items', () => {
  const amount = getAmountOfItemsAbleToBuy(22, 0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(2);
});

test('calcs 1 for exact funds for second items', () => {
  const amount = getAmountOfItemsAbleToBuy(12, 1, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(1);
});

test('calcs 5 for exact funds for next 5 items after 5 where bought', () => {
  const amount = getAmountOfItemsAbleToBuy(120, 5, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(5);
});

test('calcs 5 for non exact funds for next 5 items after 5 where bought', () => {
  const amount = getAmountOfItemsAbleToBuy(122, 5, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM);

  expect(amount).toBe(5);
});
