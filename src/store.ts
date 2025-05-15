import { create } from 'zustand';
import {
  LinesState,
  ItemName,
  ItemsNumMap
} from './types';
import { ITEM_NAMES_MAP, ITEMS_CONFIG } from './consts';

const recalculateItemsAbleToBuy = (state: LinesState) => (
  (Object.values(ITEM_NAMES_MAP) as ItemName[]).reduce((acc, itemName) => ({
    ...acc,
    [itemName]: ITEMS_CONFIG[itemName].getAmountOfItemsAbleToBuy(state.linesCount, state.itemCounts[itemName])
  }), {}) as ItemsNumMap
)

const useLinesStore = create<LinesState>((set) => ({
  linesCount: 0,
  earnedLines: 0,
  linesInc: 0,
  itemCounts: ((Object.values(ITEM_NAMES_MAP)).reduce((acc, itemName) => ({ ...acc, [itemName]: 0 }), {})) as ItemsNumMap,
  itemsAbleToBuy: (Object.values(ITEM_NAMES_MAP).reduce((acc, itemName) => ({ ...acc, [itemName]: 0 }), {})) as ItemsNumMap,
  actions: {
    increment: () => set((state) => ({
      ...state,
      itemsAbleToBuy: recalculateItemsAbleToBuy(state),
      linesCount: state.linesCount + state.linesInc,
      earnedLines: state.earnedLines + state.linesInc
    })),
    click: () => set((state) => ({ ...state, ...recalculateItemsAbleToBuy(state), linesCount: state.linesCount + 1, earnedLines: state.earnedLines + 1 })),
    buyItem: (itemName: ItemName, count = 1) => set((state) => {
      const prepedCount = count === 'MAX' ? state.itemsAbleToBuy[itemName] : count;
      const price = ITEMS_CONFIG[itemName].getItemsPrice(state.itemCounts[itemName], prepedCount);

      if (state.linesCount < price) {
        throw new Error(`You can't afford ${prepedCount} ${itemName}`);
      }

      const newState = { ...state };
      newState.linesCount -= price;
      newState.itemCounts[itemName] += prepedCount;
      newState.linesInc += ITEMS_CONFIG[itemName].baseLinesInc * prepedCount;

      return { ...newState, ...recalculateItemsAbleToBuy(newState) };
    })
  }
}));

export default useLinesStore;
