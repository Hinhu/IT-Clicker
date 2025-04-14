import { ItemNameMap, ItemName, ItemsConfig } from "./types";

import arithmeticGetN from './utils/arithmetic/getAmountOfItemsAbleToBuy';
import arithmeticGetPrice from './utils/arithmetic/getItemsPrice';

export const ITEM_NAMES_MAP: ItemNameMap = {
  INTERN: 'intern',
  JUNIOR: 'junior'
};

export const ITEM_NAMES = Object.values(ITEM_NAMES_MAP) as ItemName[];

export const ITEM_BASE_PRICE = {
  [ITEM_NAMES_MAP.INTERN]: 10,
  [ITEM_NAMES_MAP.JUNIOR]: 100,
};

export const ITEM_PRICE_INCREMENT = {
  [ITEM_NAMES_MAP.INTERN]: 2,
  [ITEM_NAMES_MAP.JUNIOR]: 5,
};

export const ITEMS_CONFIG = Object.entries({
  [ITEM_NAMES_MAP.INTERN]: {
    basePrice: ITEM_BASE_PRICE[ITEM_NAMES_MAP.INTERN],
    baseLinesInc: 1
  },
  [ITEM_NAMES_MAP.JUNIOR]: {
    basePrice: ITEM_BASE_PRICE[ITEM_NAMES_MAP.JUNIOR],
    baseLinesInc: 3,
  }
}).reduce((acc, [itemsName, itemsData]) => ({
  ...acc,
  [itemsName]: {
    ...itemsData,
    getAmountOfItemsAbleToBuy: (currentLines: number, currentItemCount: number) => arithmeticGetN(
      currentLines,
      currentItemCount,
      ITEM_BASE_PRICE[itemsName],
      ITEM_PRICE_INCREMENT[itemsName]
    ),
    getItemsPrice: (currentItemCount: number, itemsToBuyCount: number) => arithmeticGetPrice(
      currentItemCount,
      ITEM_BASE_PRICE[itemsName],
      ITEM_PRICE_INCREMENT[itemsName],
      itemsToBuyCount
    )
  }
}), {}) as ItemsConfig;