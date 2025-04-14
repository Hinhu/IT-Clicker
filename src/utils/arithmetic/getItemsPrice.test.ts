import getItemsPrice from "./getItemsPrice"

const BASE_ITEM_PRICE = 10;
const PRICE_INC_PER_ITEM = 2;


test('calcs price for buying first item', () => {
  const amount = getItemsPrice(0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM, 1);

  expect(amount).toBe(BASE_ITEM_PRICE);
});


test('calcs price for buying first 4 items', () => {
  const amount = getItemsPrice(0, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM, 4);

  expect(amount).toBe(52);
});

test('calcs price for buying next 2 items after 2 been bought', () => {
  const amount = getItemsPrice(2, BASE_ITEM_PRICE, PRICE_INC_PER_ITEM, 2);

  expect(amount).toBe(30);
});