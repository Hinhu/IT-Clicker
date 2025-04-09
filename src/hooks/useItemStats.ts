import { useShallow } from 'zustand/react/shallow';

import { ITEMS_CONFIG } from '../consts';
import useLinesStore from '../store';
import { ItemName, ItemCounts } from '../types';

function useItemsStats(itemName: ItemName) {
  const { count, itemsAbleToBuy } = useLinesStore(useShallow((state) => ({
    count: state[(itemName + "Count") as keyof ItemCounts],
    itemsAbleToBuy: state[(itemName + "CountAbleToBuy") as keyof ItemCounts]
  })));
  const price = ITEMS_CONFIG[itemName].getPrice(count);

  return { count, price, itemsAbleToBuy };
}

export default useItemsStats;