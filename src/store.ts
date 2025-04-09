import { create } from 'zustand';
import { LinesState, ItemCounts, ItemCountsAbleToBuy, ItemName } from './types';
import { ITEM_NAMES_MAP, ITEMS_CONFIG } from './consts';

const getItemPrice = (state: LinesState, itemName: ItemName) => ITEMS_CONFIG[itemName].getPrice(state[(itemName + "Count") as keyof ItemCounts]);

const recalculateItemsAbleToBuy = (state: LinesState) => (
  (Object.values(ITEM_NAMES_MAP) as ItemName[]).reduce((acc, itemName) => ({
    ...acc,
    [itemName + 'CountAbleToBuy']: Math.floor(state.linesCount / getItemPrice(state, itemName))
  }), {})
)

const useLinesStore = create<LinesState>((set) => ({
  linesCount: 0,
  linesInc: 0,
  ...(Object.values(ITEM_NAMES_MAP).reduce((acc, itemName) => ({ ...acc, [itemName + 'Count']: 0 }), {}) as ItemCounts),
  ...(Object.values(ITEM_NAMES_MAP).reduce((acc, itemName) => ({ ...acc, [itemName + 'CountAbleToBuy']: 0 }), {}) as ItemCountsAbleToBuy),
  increment: () => set((state) => ({ ...state, ...recalculateItemsAbleToBuy(state), linesCount: state.linesCount + state.linesInc })),
  click: () => set((state) => ({ ...state, ...recalculateItemsAbleToBuy(state), linesCount: state.linesCount + 1 })),
  buyItem: (itemName: ItemName, count = 1) => set((state) => {
    const itemPrice = getItemPrice(state, itemName);

    if (state.linesCount < itemPrice * count) {
      throw new Error(`You can't afford ${count} ${itemName}`);
    }

    const newState = { ...state };
    newState.linesCount = state.linesCount - itemPrice * count;
    newState[(itemName + "Count") as keyof ItemCounts] += count;
    newState.linesInc += ITEMS_CONFIG[itemName].baseLinesInc * count;

    return { ...newState, ...recalculateItemsAbleToBuy(newState) };
  })
}));

export default useLinesStore;
