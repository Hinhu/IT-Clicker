import { ItemNameMap, ItemName } from "./types";

export const ITEM_NAMES_MAP: ItemNameMap = {
  INTERN: 'intern',
  JUNIOR: 'junior'
};

export const ITEM_NAMES = Object.values(ITEM_NAMES_MAP) as ItemName[];

export const ITEM_BASE_PRICE = {
  [ITEM_NAMES_MAP.INTERN]: 10,
  [ITEM_NAMES_MAP.JUNIOR]: 100,
}

export const ITEMS_CONFIG = {
  [ITEM_NAMES_MAP.INTERN]: {
    basePrice: ITEM_BASE_PRICE[ITEM_NAMES_MAP.INTERN],
    baseLinesInc: 1,
    getPrice: (internCount: number) => ITEM_BASE_PRICE[ITEM_NAMES_MAP.INTERN] + internCount * 2
  },
  [ITEM_NAMES_MAP.JUNIOR]: {
    basePrice: ITEM_BASE_PRICE[ITEM_NAMES_MAP.JUNIOR],
    baseLinesInc: 5,
    getPrice: (juniorCount: number) => ITEM_BASE_PRICE[ITEM_NAMES_MAP.JUNIOR] + juniorCount * 5
  }
};